import uploadFile from "../service/imagekit.js";

export async function uploadSong(req, res) {
  const result = await uploadFile(req.file);

  res.status(200).json({
    message: "Request was successful",
    data: result,
  });
}
