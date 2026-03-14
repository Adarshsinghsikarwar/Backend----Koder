import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function register(req, res) {
  try {
    const { email, password, userType } = req.body;

    const passwordHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await userModel.create({
      email,
      password: passwordHash,
      userType,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType,
      },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

export async function getMe(req, res) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    res.status(200).json({
      message: "user data fetched",
      decoded,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordValid = user.password === passwordHash;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
      success: false,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      userType: user.userType,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
}

export async function logout(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "logout user",
  });
}
