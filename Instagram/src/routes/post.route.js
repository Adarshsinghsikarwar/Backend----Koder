import express from "express";
import multer from "multer";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const postRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});


// GET /api/posts - Get all posts
postRouter.get("/", authenticateToken, getPosts);

// GET /api/posts/:id - Get post by ID
postRouter.get("/:id", authenticateToken, getPostById);

// POST /api/posts - Create a new post
postRouter.post("/", authenticateToken, upload.array("media", 10), createPost);

// PATCH /api/posts/:id - Update a post
postRouter.patch("/:id", authenticateToken, upload.array("media", 10), updatePost);

// DELETE /api/posts/:id - Delete a post
postRouter.delete("/:id" , authenticateToken, ()=>{})

export default postRouter;
