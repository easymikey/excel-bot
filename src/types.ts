type TDate = string;

export type TRequest = {
  name: string;
  created: TDate;
  modified: TDate;
  mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  file: string;
  media_type: "document";
  path: string;
  type: "file";
};
