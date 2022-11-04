const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const LIMIT = 4;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

let connectedUsers = 0;

io.on("connection", (socket) => {
  if (connectedUsers === LIMIT) {
    socket.leave("room");
    console.log(`Max number of users has been reached!`);
    return;
  }
  connectedUsers++;
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log(data);
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnect`);
    socket.leave(roomId);
  });
});

server.listen(PORT || process.env.PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
