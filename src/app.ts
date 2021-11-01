import { join } from 'path';
import { unlink } from 'fs/promises';
import * as dotenv from 'dotenv';

import { upload } from './upload';
import { download } from './download';
import { getFileUrl, getWeekday } from './helpers';
import { removeColumnsFromExcelFile } from './remove-columns-from-excel-file';

dotenv.config();

(async () => {
  try {
    const filename = `${process.env.SOURCE_NAME}`;
    const file = await getFileUrl(
      join(`${process.env.DISK_PATH}`, filename)
    );

    await download(file, filename);
    await removeColumnsFromExcelFile(filename);
    await upload(
      join(`${process.env.DISK_PATH}`, `${process.env.DIST_NAME}`),
      filename
    );
  } catch (e) {
    console.error(e);
  }
})();
