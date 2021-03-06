import https from 'https';
import { stringify } from 'querystring';

import { parseUrl } from '.';

export const fetch = <T>(options: {
  token?: string;
  method?: string;
  url: string;
  query?: {};
}): Promise<ApiResponse<T>> =>
  new Promise((resolve, reject) => {
    const params = { method: 'GET', ...options };
    const parsedUrl = parseUrl(options.url);

    const request = https.request(
      {
        ...parsedUrl,
        method: params.method,
        path: `${parsedUrl.pathname}?${stringify(params.query)}`,
        headers: {
          Authorization: `OAuth ${options.token}`
        }
      },
      response => {
        let data = '';

        response
          .on('error', reject)
          .on('data', chunk => (data += chunk))
          .on('end', () => {
            const parsedData = data === '' ? null : JSON.parse(data);
            const statusCode = response.statusCode!;

            if (statusCode >= 200 && statusCode < 300) {
              resolve({ data: parsedData, status: statusCode });
            } else {
              reject(new Error(parsedData.description));
            }
          });
      }
    );

    request.on('error', reject);
    request.end();
  });
