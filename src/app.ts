import * as dotenv from "dotenv";

import {downloadFileByUrl, getFileUrl} from "./helpers";
import {createCopyOfFile} from "./create-copy-of-file";

dotenv.config();

(async () => {
  const url = await getFileUrl();
  const deletedCells = process.argv.slice(2);

  await downloadFileByUrl(url);

  createCopyOfFile(
    `${process.env.SOURCE_NAME}`,
    `${process.env.DIST_NAME}`,
    deletedCells
  );
})();
