import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { email, password, userType } = req.body;

    const user = await userModel.create({
      email,
      password,
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
    res.status(500).json({ message: "Registration failed", error: error.message });
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

export async function logout(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "logout user",
  });
}
