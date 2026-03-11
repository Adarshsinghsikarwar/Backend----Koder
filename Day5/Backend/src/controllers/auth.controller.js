import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign({ email: user.email }, config.SECRET_KEY);

  res.status(201).json({
    message: "user created successfully",
    token,
  });
}

export async function getMe(req, res) {
  const { token } = req.body;
  const decoded = await jwt.verify(token, config.SECRET_KEY);

  res.status(200).json({
    message: "user data read successfully",
    user: decoded,
  });
}
