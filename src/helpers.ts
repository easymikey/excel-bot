import fs from "fs";
import path from "path";
import axios from "axios";

async function downloadFileByUrl(url: string) {
  const writer = fs.createWriteStream(
    path.resolve(process.cwd(), `${process.env.SOURCE_NAME}`)
  );

  try {
    const {data} = await axios.get(url, {
      responseType: "stream"
    });

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
  const url = encodeURI(
    `${process.env.API_URL}?path=${process.env.DISK_PATH}`
  );

  const {data} = await axios.get<TRequest>(url, {
    headers: {
      Authorization: `OAuth ${process.env.TOKEN}`
    }
  });

  return data.file;
}

export {downloadFileByUrl, getFileUrl};
