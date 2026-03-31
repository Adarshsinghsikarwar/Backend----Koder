import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. user is not authenticated." });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "session expired. Please login again." });
  }
};
