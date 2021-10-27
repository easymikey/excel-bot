import { config } from "dotenv";

import { downloadFileByUrl, getFileUrl } from "./helpers";

import { createCopyOfFile } from "./create-copy-of-file";

config();

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
