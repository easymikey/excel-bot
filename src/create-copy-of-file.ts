import fs from "path";
import type {WorkSheet} from "xlsx";
import {readFile, utils, writeFile} from "xlsx";

function createCopyOfFile(
  sourceName: string,
  distName: string,
  deletedCells: Array<string>
) {
  const sourceWB = readFile(fs.resolve(process.cwd(), sourceName), {
    cellStyles: true
  });
  const distWB = utils.book_new();

  sourceWB.SheetNames.forEach(sheetName => {
    const sourceWS = sourceWB.Sheets[sheetName];

    const createWS = () =>
      Object.keys(sourceWS).reduce(
        (acc, cell) =>
          !deletedCells.includes(cell[0])
            ? {...acc, [cell]: sourceWS[cell]}
            : acc,
        {} as WorkSheet
      );

    utils.book_append_sheet(distWB, createWS(), sheetName);
  });

  writeFile(distWB, distName, {
    cellStyles: true,
    compression: true,
    type: "file"
  });
}

export {createCopyOfFile};
