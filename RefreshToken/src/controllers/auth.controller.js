import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import sessionModel from "../models/session.model.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isAlreadyExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const user = await userModel({
      username,
      email,
      password: passwordHashed,
    });
    await user.save();

    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    const refreshTokenHashed = await bcrypt.hash(refreshToken, 10);

    const session = await sessionModel({
      user: user._id,
      refreshToken: refreshTokenHashed,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    await session.save();

    const accessToken = jwt.sign(
      { id: user._id, sessionId: session._id },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user, accessToken });
  } catch (error) {
    console.log("Error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
  const refreshTokenHashed = await bcrypt.hash(refreshToken, 10);

  const session = await sessionModel({
    user: user._id,
    refreshToken: refreshTokenHashed,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  await session.save();
  const accessToken = jwt.sign(
    { id: user._id, sessionId: session._id },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  res.status(200).json({ message: "Login successful", user, accessToken });
}

export async function getMe(req, res) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const user = await userModel.findById(decoded.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({
      message: "token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const refreshTokenHashed = await bcrypt.hash(refreshToken, 10);

  const session = await sessionModel.findOne({
    refreshToken: refreshTokenHashed,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const accessToken = jwt.sign(
    {
      id: decoded._id,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const newRefreshTokenHashed = await bcrypt.hash(newRefreshToken, 10);

  session.refreshToken = newRefreshTokenHashed;
  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "access token  refreshed successfully",
    accessToken,
  });
}

export async function logout(req, res) {
  const refreshToken = req.cookies.token;

  if (!refreshToken) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const refreshTokenHashed = await bcrypt.hash(refreshToken, 10);
  try {
    const session = await sessionModel.findOne({
      refreshToken: refreshTokenHashed,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Error in logout controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logoutAll(req, res) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  await sessionModel.updateMany(
    { user: decoded.id, revoked: false },
    { revoked: true }
  );

  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out from all sessions successfully",
  });
}
