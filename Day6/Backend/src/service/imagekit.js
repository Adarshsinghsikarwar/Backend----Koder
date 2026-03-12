import ImageKit from "@imagekit/nodejs";
import { randomUUID } from "crypto";
import { config } from "../config/config.js";
import fs from "fs";
const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  console.log(file);
  try {

    const result = await imagekit.files.upload({
      // file: await toFile(file.buffer, file.originalname),
      file: fs.createReadStream(file.path),
      fileName: randomUUID(),
    });

    return result;
  } catch (error) {
    throw new Error(`ImageKit Upload Failed: ${error.message}`);
  }
}

export default uploadFile;
