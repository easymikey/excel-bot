import { join } from 'path';
import * as dotenv from 'dotenv';
import schedule from 'node-schedule';
import { unlink } from 'fs/promises';

import {
  upload,
  download,
  writeLog,
  removeWorksheetColumns
} from './features';
import { fetchFileUrl, getWeekday } from './helpers';

dotenv.config();

(async () => {
  try {
    schedule.scheduleJob('* * * * *', async date => {
      console.log('Bot started up 🚀');

      const weekday = getWeekday(date);
      const workingDays = process.argv.slice(2);

      if (workingDays.includes(weekday)) {
        const diskPath = process.env.DISK_PATH as string;
        const sourceName = process.env.SOURCE_NAME as string;
        const distName = process.env.DIST_NAME as string;

        const getFullDiskPath = (filename: string) =>
          join(diskPath, filename);

        const remoteUrl = await fetchFileUrl(
          getFullDiskPath(sourceName)
        );

        await download(remoteUrl, sourceName);
        await removeWorksheetColumns(sourceName);
        await upload(getFullDiskPath(distName), sourceName);
        await unlink(sourceName);
        await writeLog(date);
      }

      console.log('\nBot has completed work ✅');
    });
  } catch (e) {
    console.error('Bot crashed 🚒');
    console.error(e);
  }
})();
