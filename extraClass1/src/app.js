import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
); // it mean allowed all the origin

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://myapp.com"
// ];                                 // this is also a way

// app.use(cors({
//   origin: allowedOrigins
// }));

// app.use(
//   cors({
//     origin: "http://localhost:5173", // it mean  allowed the 5173 origin
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     headers: {
//       Authorization: "Bearer token",
//       "Content-Type": "application/json",
//     },
//     allowedHeaders: ["Content-Type", "Authorization"],
//     exposedHeaders: ["Authorization"],
//     credentials: true,
//     maxAge: 60,
//     optionsSuccessStatus: 200,
//   }),
// );

// app.use(express.json());

app.get("/notes", (req, res) => {
  res.send({
    message: "This message from Note ",
  });
});

export default app;
