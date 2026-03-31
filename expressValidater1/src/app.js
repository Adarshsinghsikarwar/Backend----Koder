import express from "express";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

export default app;
