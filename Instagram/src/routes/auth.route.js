import express from "express";
import { validate } from "../middleware/validator.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/userValidator.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  googleCallback,
} from "../controllers/auth.controller.js";
import passport from "passport";

import { authenticateToken } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// POST /api/auth/register - Register a new user
authRouter.post("/register", registerUser);

// POST /api/auth/login - Login a user
authRouter.post("/login", loginUser);

// POST /api/auth/logout - Logout a user
authRouter.post("/logout", authenticateToken, logoutUser);

// GET /api/auth/me - Get current user info
authRouter.get("/me", authenticateToken, getMe);

// GET /api/auth/google - Initiate Google OAuth login
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// GET /api/auth/google/callback - Handle Google OAuth callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleCallback
);

export default authRouter;
