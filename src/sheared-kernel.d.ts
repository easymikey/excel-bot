type TDate = string;

type TDownloadRequest = {
  name: string;
  created: TDate;
  modified: TDate;
  mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  file: string;
  media_type: 'document';
  path: string;
  type: 'file';
};

type TUploadRequest = { href: string; method: string };

type ApiResponse<T> = {
  data: T;
  status?: number;
};
