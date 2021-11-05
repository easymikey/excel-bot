import { join } from 'path';
import Excel from 'exceljs';
import { unlink } from 'fs/promises';

export const removeWorksheetColumns = async (filename: string) => {
  const { xlsx } = new Excel.Workbook();
  const workbook = await xlsx.readFile(join(process.cwd(), filename));

  workbook.eachSheet(worksheet => {
    worksheet.spliceColumns(8, 1);
    worksheet.spliceColumns(9, 1);
  });

  await unlink(filename);
  await workbook.xlsx.writeFile(filename);
};
