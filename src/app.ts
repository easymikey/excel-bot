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
    console.log('App started');
    schedule.scheduleJob('00 22 * * *', async date => {
      const weekday = getWeekday(date);
      const workingDays = process.argv.slice(2);

      if (workingDays.includes(weekday)) {
        const { DISK_PATH, SOURCE_NAME, DIST_NAME } = process.env;

        const getFullPath = (filename: string) =>
          join(`${DISK_PATH}`, filename);
        const remoteUrl = await fetchFileUrl(
          getFullPath(`${SOURCE_NAME}`)
        );

        await download(remoteUrl, `${SOURCE_NAME}`);
        await removeWorksheetColumns(`${SOURCE_NAME}`);
        await upload(getFullPath(`${DIST_NAME}`), `${SOURCE_NAME}`);
        await unlink(`${SOURCE_NAME}`);
        await writeLog(date);
      }
    });
  } catch (e) {
    console.error(e);
  }
})();
