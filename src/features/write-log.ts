import { appendFile } from 'fs/promises';

export const writeLog = async (date: Date) => {
  await appendFile('log', `file copied at ${date}.\n`, 'utf-8');
};
