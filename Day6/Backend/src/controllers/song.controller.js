import uploadFile from "../service/imagekit.js";
import id3 from "node-id3";
import songModel from "../models/song.model.js";

export async function uploadSong(req, res) {
  // const result = await uploadFile(req.file);

  const { title, artist, image } = id3.read(req.file.buffer);
  const fileResult = await uploadFile(req.file.buffer, req.file.originalname);
  const imageFileResult = await uploadFile(
    image.imageBuffer,
    req.file.originalname + ".jpg"
  );

  const song = await songModel.create({
    title,
    artist,
    url: fileResult.url,
    posterUrl: imageFileResult.url,
    user: id,
  });

  res.status(200).json({
    message: "Request was successful",
    song,
  });
}

export async function singleSong(req, res) {
  const { id } = req.params;
  const song = await songModel.findOne()
}
