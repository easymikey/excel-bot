import { join } from 'path';
import Excel from 'exceljs';
import fs from 'fs/promises';

export const removeColumnsFromExcelFile = async (
  filename: string
) => {
  const excel = new Excel.Workbook();
  const workbook = await excel.xlsx.readFile(
    join(process.cwd(), filename)
  );

  workbook.eachSheet(worksheet => {
    worksheet.spliceColumns(8, 1);
    worksheet.spliceColumns(9, 1);
  });

  await fs.unlink(filename);
  await workbook.xlsx.writeFile(filename);
};
