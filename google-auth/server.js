import dotenv from "dotenv/config.js";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";

const app = express();

passport.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    }
  )
);

// Route to initiate Google OAuth flow
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google will redirect to after authentication

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  }
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
