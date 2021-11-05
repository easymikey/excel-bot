import { fetch } from './fetch';

export const fetchUploadData = async (path: string) => {
  const { data } = await fetch<TUploadRequest>({
    token: `${process.env.TOKEN}`,
    url: `${process.env.API_URL}/upload`,
    query: {
      path,
      overwrite: true
    }
  });

  return data;
};
