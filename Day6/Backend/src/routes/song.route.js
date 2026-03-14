import express from "express";
import { uploadSong } from "../controllers/song.controller.js";
import multer, { memoryStorage } from "multer";
import { authArtist, authListener } from "../middleware/auth.middleware.js";

//const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: memoryStorage() });
const songRoutes = express.Router();

songRoutes.post("/", authArtist, upload.single("song"), uploadSong);
songRoutes.get("/song", authListener, singleSong);

export default songRoutes;
