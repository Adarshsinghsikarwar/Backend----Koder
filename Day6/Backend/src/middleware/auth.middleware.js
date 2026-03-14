import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authArtist = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({
      message: "token is required",
    });
    return;
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  if (decoded.userType !== "artist") {
    res.status(403).json({
      message: "user is not an artist",
    });
    return;
  }

  req.user = decoded;
  next();
};

export const authListener = async (req, res, next) => {
  const { token } = req.cookie;

  if (!token) {
    res.status(401).json({
      message: "token is required",
    });
    return;
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  req.user = decoded;
  next();
};
