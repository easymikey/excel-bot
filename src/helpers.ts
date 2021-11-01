import { request } from './request';

const getWeekday = (date: Date) =>
  ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'][date.getDay()];

const parseUrl = (url: string) => {
  const parsedUrl = new URL(url);

  return {
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    href: parsedUrl.href,
    path: parsedUrl.pathname
  };
};

const showProgress = (
  type: 'upload' | 'download',
  receivedBytes: number,
  totalBytes: number
) => {
  const percentage = ((receivedBytes * 100) / totalBytes).toFixed(2);

  process.stdout.write('\r');
  process.stdout.write(
    `${percentage}/% | ${receivedBytes} bytes ${type}ed out of ${totalBytes} bytes.`
  );
};

const getFileUrl = async (path: string) => {
  const {
    data: { file }
  } = await request<TDownloadRequest>({
    token: `${process.env.TOKEN}`,
    url: `${process.env.API_URL}`,
    query: { path }
  });

  return file;
};

const getDataToUpload = async (path: string) => {
  const { data } = await request<TUploadRequest>({
    token: `${process.env.TOKEN}`,
    url: `${process.env.API_URL}/upload`,
    query: {
      path,
      overwrite: true
    }
  });

  return data;
};

export {
  getFileUrl,
  getDataToUpload,
  parseUrl,
  showProgress,
  getWeekday
};
