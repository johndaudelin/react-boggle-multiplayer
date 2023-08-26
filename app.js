const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const c = require("./constants.js");
const actions = require("./actions.js");
const { getConfig } = require("./helpers");

const port = process.env.PORT || 4001;

const app = express();

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/health", function (req, res) {
  console.log("Received health check request");
  res.sendStatus(200);
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

const server = http.createServer(app);

const io = socketIo(server);
const gameState = {
  rooms: [],
};
const intervals = {};

exports.io = io;
exports.gameState = gameState;
exports.intervals = intervals;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on(c.SOCKET_EVENTS.LEAVE_ROOM, () => {
    const config = getConfig(socket);
    actions.leaveRoom(socket, config);
  });
  socket.on(c.SOCKET_EVENTS.ENTER_ROOM, (config) =>
    actions.enterRoom(socket, config)
  );
  socket.on(c.SOCKET_EVENTS.START_GAME, () => {
    const config = getConfig(socket);
    actions.startGame(socket, config);
  });
  socket.on(c.SOCKET_EVENTS.ADD_SCORECARD, (scorecard) => {
    const config = getConfig(socket);
    actions.addScorecard(socket, config, scorecard);
  });

  socket.on("disconnect", () => {
    const config = getConfig(socket);
    if (config.roomName) {
      actions.leaveRoom(socket, config);
    }
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
