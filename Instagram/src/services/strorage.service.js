import { ImageKit, toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imageKit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async (buffer, originalName) => {
  try {
    const result = await imageKit.files.upload({
      file: await toFile(buffer, originalName),
      fileName: originalName,
    });
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
