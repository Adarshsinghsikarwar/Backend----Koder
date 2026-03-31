import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(`user connected successfully ${socket.id}`);

  socket.on("join-room", ({ username, room }) => {
    socket.join(room);

    users[socket.id] = { username, room };
    console.log(`${username} joined ${room}`);
    socket.to(room).emit("recieve-message", {
      message: `${username} joined chat`,
      system: true,
    });
    console.log(``);
  });

  socket.on("send-message", (data) => {
    const user = users[data.socket.id];

    if (!user) return;
    io.to(room).emit("recieve", {
      username: user.username,
      message: data,
    });
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];

    if (user) {
      socket.to(user.room).emit("recieve-message", {
        username: `${user.username} left the chat`,
        system: true,
      });
      delete users[socket.id];
    }

    console.log(`User disconnected : `, socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
