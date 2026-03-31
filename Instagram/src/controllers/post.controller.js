import postModel from "../models/post.model.js";
import { uploadFile } from "../services/strorage.service.js";

const getMediaType = (type) => {
  if (file.fileType == "image") return "image";
  if (file.fileType == "video") return "video";
  throw new Error("Unsupported media type");
};

export async function createPost(req, res) {
  try {
    const { caption } = req.body;
    const files = req.files;
    const user = req.user;

    const media = await Promise.all(
      files.map((file) => uploadFile(file.buffer, file.originalname))
    );

    const post = new postModel({
      user: user.id,
      caption,
      media: media.map((file) => ({
        url: file.url,
        type: getMediaType(file),
      })),
    });
    await post.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postModel
      .find()
      .populate("user", "userName profileImage")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await postModel
      .findById(id)
      .populate("user", "userName profileImage");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Post fetched successfully", success: true, post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { caption, deletedMedia } = req.body;

  const post = await postModel.findById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
      success: false,
    });
  }

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You are not the owner of this post",
      success: false,
    });
  }

  post.caption = caption || post.caption;

  if (deletedMedia && deletedMedia.length > 0) {
    post.media = post.media.filter(
      (m) => !deletedMedia.includes(m._id.toString())
    );
  }

  await post.save();

  return res.status(200).json({
    message: "Post updated successfully",
    success: true,
    post,
  });
}
