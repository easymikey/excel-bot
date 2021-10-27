import axios from "axios";
import { resolve } from "path";
import { createWriteStream } from "fs";
import type { TRequest } from "./types";

async function downloadFileByUrl(url: string) {
  const writer = createWriteStream(
    resolve(process.cwd(), `${process.env.SOURCE_NAME}`)
  );

  try {
    const { data } = await axios.get(url, { responseType: "stream" });

    data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error(err);
  }
}

async function getFileUrl() {
  const {
    data: { file },
  } = await axios.get<TRequest>(
    encodeURI(`${process.env.API_URL}?path=${process.env.DISK_PATH}`),
    {
      headers: {
        Authorization: `OAuth ${process.env.TOKEN}`,
      },
    }
  );

  return file;
}

export { downloadFileByUrl, getFileUrl };
