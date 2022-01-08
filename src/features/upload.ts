import { request } from 'https';
import { createReadStream } from 'fs';
import { fetchUploadData, parseUrl } from '../helpers';

export const upload = async (path: string, filename: string) => {
  try {
    const readableStream = createReadStream(filename);
    const { href, method } = await fetchUploadData(path);
    const uploadStream = request({ ...parseUrl(href), method });

    readableStream
      .on('end', () => {
        process.stdout.write('\n');
        uploadStream.end();
      })
      .pipe(uploadStream);
  } catch (error) {
    console.log(error);
  }
};
