import express from "express";
import { registerValidation } from "../validator/userValidator.js";
import { validate } from "../middleware/validate.js";
import { register } from "../controller/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerValidation, validate, register);

export default authRoutes;
