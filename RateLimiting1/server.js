import rateLimit from "express-rate-limit";
import express from "express";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes of Time window
  max: 100, // max 100 request per IP
  message: "Too many requests, try again later",
});
const app = express();
app.use(express.json());
app.use(limiter);

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    success: false;
    message: "Too many login attempts, try again later";
  },
});

// app.use("/login", loginLimiter);
// Only 5 login attempts per 10 minutes

// const userLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//  
//   keyGenerator: (req) => {
//     return req.user?.id || req.ip;
//   },

//   message: "Too many requests from this user",
// });
