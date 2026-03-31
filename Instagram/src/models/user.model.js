import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    sparse : true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse : true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  bio: {
    type: String,
    trim: true,
    default: "",
    maxlength: 150,
  },
  profileImage: {
    type: String,
    trim: true,
    default: "https://ik.imagekit.io/zdc2bt86h/profileImage?updatedAt=1774290662832",
  },
  fullName: { type: String,  trim: true },
  private: {
    type: Boolean,
    default: false,
    enum: [true, false],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
