import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import bcrypt from "bcrypt";

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @requires username, email, password, fullname in request body
 * @returns {Object} 201 - User registered successfully
 * @returns {Object} 422 - User with this email or username already exists
 * @returns {Object} 500 - Internal server error
 */

export async function registerUser(req, res) {
  try {
    const { userName, email, password , fullName } = req.body;
    const isExistingUser = await userModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (isExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    const saltRounds = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
      fullName

    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @requires email, password in request body
 * @returns {Object} 200 - User logged in successfully
 * @returns {Object} 401 - Invalid credentials
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

/**
 * @route GET /api/auth/me
 * @desc Get current logged in user
 * @access Private
 * @returns {Object} 200 - User fetched successfully
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */

export async function getMe(req, res) {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

/**
 * @route GET /api/auth/google/callback
 * @desc Google OAuth callback
 * @access Public
 * @returns {Object} 200 - User logged in successfully
 * @returns {Object} 201 - User registered successfully
 * @returns {Object} 500 - Internal server error
 */

export async function googleCallback(req, res) {
  const { id, displayName, emails, photos } = req.user;

  const isUserExists = await userModel.findOne({
    email: emails[0].value,
  });

  if (isUserExists) {
    const token = jwt.sign(
      {
        id: isUserExists._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: isUserExists._id,
        username: isUserExists.userName,
        email: isUserExists.email,
        fullname: isUserExists.fullName,
        bio: isUserExists.bio,
        profileImage: isUserExists.profileImage,
        private: isUserExists.private,
      },
    });
  }

  const user = await userModel.create({
    username: emails[0].value.split("@")[0],
    email: emails[0].value,
    fullname: displayName,
    profileImage: photos[0].value,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.userName,
      email: user.email,
      fullname: user.fullName,
      bio: user.bio,
      profileImage: user.profileImage,
      private: user.private,
    },
  });
}
