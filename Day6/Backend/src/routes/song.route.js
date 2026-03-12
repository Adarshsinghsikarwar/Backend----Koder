import express from "express";
import { uploadSong } from "../controllers/song.controller.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const songRoutes = express.Router();

songRoutes.post("/", upload.single("song"), uploadSong);

export default songRoutes;
