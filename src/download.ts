import { join } from 'path';
import { createWriteStream } from 'fs';
import { https } from 'follow-redirects';

import { showProgress } from './helpers';

export const download = (remoteUrl: string, filename: string) =>
  new Promise((resolve, reject) => {
    let totalBytes = 0;
    let receivedBytes = 0;

    const writeStream = createWriteStream(
      join(process.cwd(), filename)
    );

    const request = https.get(remoteUrl, response => {
      response
        .on('error', reject)
        .on('data', chunk => {
          receivedBytes += chunk.length;
          showProgress('download', receivedBytes, totalBytes);
        })
        .on('end', () => {
          writeStream.end(() => resolve(null));
        })
        .pipe(writeStream);
    });

    request
      .on('error', reject)
      .on('response', ({ headers }) => {
        totalBytes = parseInt(headers['content-length']!, 10);
      })
      .end();
  });
