import { fetch } from './fetch';

export const fetchFileUrl = async (path: string) => {
  const {
    data: { file: remoteUrl }
  } = await fetch<TDownloadRequest>({
    token: `${process.env.TOKEN}`,
    url: `${process.env.API_URL}`,
    query: { path }
  });

  return remoteUrl;
};
