import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure a user can only like a post once
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const likeModel = mongoose.model("Like", likeSchema);

export default likeModel;
