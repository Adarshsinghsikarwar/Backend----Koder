import express from "express";
import {
  register,
  getMe,
  logout,
  login,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/getMe", getMe);
authRouter.post("/logout", logout);
authRouter.post("/login", login);

export default authRouter;
