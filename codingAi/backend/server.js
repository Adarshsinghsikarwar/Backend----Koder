import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";
import dns from "dns";
dns.setServers(["0.0.0.0", "8.8.8.8"]);

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
