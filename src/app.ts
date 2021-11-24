import { join } from 'path';
import * as dotenv from 'dotenv';
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
    const date = new Date();
    const weekday = getWeekday(date);
    const workingDays = process.env.WORKING_DAYS?.split(',');

    if (workingDays?.includes(weekday)) {
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
  } catch (e) {
    console.error('Bot crashed 🚒');
    console.error(e);
  }
})();
