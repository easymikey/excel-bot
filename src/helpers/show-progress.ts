export const showProgress = (
  type: 'upload' | 'download',
  receivedBytes: number,
  totalBytes: number
) => {
  const percentage = ((receivedBytes * 100) / totalBytes).toFixed(2);

  process.stdout.write('\r');
  process.stdout.write(
    `${percentage}/% | ${receivedBytes} bytes ${type}ed out of ${totalBytes} bytes.`
  );
  process.stdout.write('\r');
};
