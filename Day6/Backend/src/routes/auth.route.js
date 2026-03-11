import express from "express";
import { register, getMe, logout } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/getMe", getMe);
authRouter.post("/logout", logout);

export default authRouter;
