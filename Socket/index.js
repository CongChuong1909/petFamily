const http = require("http");
const io = require("socket.io");

const server = http.createServer();
const socketServer = io(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

socketServer.on("connection", (socket) => {
  // When connected
  console.log("A user connected.");

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    socketServer.emit("getUsers", users);
  });

//   Send and receive messages
  socket.on("sendMessage", ({ senderId, receiverId, textcontent }) => {
    console.log("aaaaaaaaaaaaaaaaaaaaa",receiverId);
    socketServer.to(receiverId.socketId).emit("getMessage", {
    senderId,
      textcontent,
    });
  });

  // When disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    socketServer.emit("getUsers", users);
  });
});

const PORT = 8900;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
