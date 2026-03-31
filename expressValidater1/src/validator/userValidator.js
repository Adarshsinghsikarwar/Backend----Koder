import { body } from "express-validator";

export const registerValidation = [
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Please provide a valid email address"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").custom((value) => {
    if (value !== "admin") {
      throw new Error("Admin login is not allowed");
    }
    return true;
  }),
];

export const asyncValidation = [
  body("email").custom(async (value) => {
    const user = await findOne({ email: value }); // Simulate async database check
    if (user) {
      throw new Error("Email already in use");
    }
    return true;
  }),
];

export const conditionalValidation = [
  body("password")
    .if(body("email").exists())
    .notEmpty()
    .withMessage("Password is required when email is provided"),
];

export const validationChains = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];

// Sanitization (Real Use)
export const sanitization = [
  body("email").normalizeEmail(),
  body("username").trim().escape(),
];

// Custom validator (Real Use)
// Cross-field validation
export const validateForSomeThing = [
  body("confirmPassword").custom((value, { req ,res }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
