export const showProgress = (
  type: 'upload' | 'download',
  receivedBytes: number,
  totalBytes: number
) => {
  const percentage = Math.trunc((receivedBytes * 100) / totalBytes);
  const progressBarSymbols = percentage / 5;
  const dots = '.'.repeat(progressBarSymbols);
  const empty = ' '.repeat(20 - progressBarSymbols);

  process.stdout.write(`\r${type}: [${dots}${empty}] ${percentage}%`);
};
