import express from "express";
import {
  getMe,
  refreshToken,
  register,
  login,
  logout,
  logoutAll,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/getMe", getMe);
authRouter.get("/refreshToken", refreshToken);
authRouter.post("/logout", logout);
authRouter.post("/logout-all", logoutAll);

export default authRouter;
