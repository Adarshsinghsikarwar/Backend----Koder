import app from "./src/app.js";
import { connectDB } from "./src/config/databse.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
