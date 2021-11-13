import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
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
    console.log('App started');
    schedule.scheduleJob('00 22 * * *', async date => {
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
    });
  } catch (e) {
    console.error(e);
  }
})();
