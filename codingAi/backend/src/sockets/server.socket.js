import { Server } from "socket.io";

let io;

export async function initSocketServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });

  console.log("Socket.IO server initialized");
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO server not initialized");
  }
  return io;
}
