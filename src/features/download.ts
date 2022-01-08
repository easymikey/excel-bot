import { join } from 'path';
import { createWriteStream } from 'fs';
import { https } from 'follow-redirects';

export const download = (remoteUrl: string, filename: string) =>
  new Promise((resolve, reject) => {
    const writeStream = createWriteStream(
      join(process.cwd(), filename)
    );

    const request = https.get(remoteUrl, response => {
      response
        .on('error', reject)
        .on('end', () => {
          writeStream.end(() => resolve(null));
        })
        .pipe(writeStream);
    });

    request.on('error', reject).end();
  });
