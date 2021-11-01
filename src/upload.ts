import { request } from 'https';
import { createReadStream, statSync } from 'fs';
import { getDataToUpload, parseUrl, showProgress } from './helpers';

export const upload = async (path: string, filename: string) => {
  try {
    let receivedBytes = 0;
    const { size: totalBytes } = statSync(filename);
    const readableStream = createReadStream(filename);
    const { href, method } = await getDataToUpload(path);
    const uploadStream = request({ ...parseUrl(href), method });

    readableStream
      .on('data', chunk => {
        receivedBytes += chunk.length;
        showProgress('upload', receivedBytes, totalBytes);
      })
      .on('end', () => uploadStream.end())
      .pipe(uploadStream);
  } catch (error) {
    console.log(error);
  }
};
