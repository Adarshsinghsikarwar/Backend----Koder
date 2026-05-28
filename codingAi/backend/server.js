import dotenv from "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dns from "dns";
dns.setServers(["0.0.0.0", "8.8.8.8"]);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
