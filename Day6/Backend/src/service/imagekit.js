import ImageKit, { toFile } from "@imagekit/nodejs";
import { randomUUID } from "crypto";
import { config } from "../config/config.js";
import fs from "fs";
const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, originalname) {
  console.log(buffer, originalname);
  try {
    const result = await imagekit.files.upload({
      file: await toFile(buffer, originalname),
      //file: fs.createReadStream(file.path),
      fileName: randomUUID(),
    });

    return result;
  } catch (error) {
    throw new Error(`ImageKit Upload Failed: ${error.message}`);
  }
}

export default uploadFile;
