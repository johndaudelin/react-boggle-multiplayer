const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const c = require('./constants.js')
const actions = require('./actions.js')

const port = process.env.PORT || 4001

const app = express()

const server = http.createServer(app)

const io = socketIo(server)
const gameState = {
  rooms: []
}
const intervals = {}

exports.io = io
exports.gameState = gameState
exports.intervals = intervals

io.on('connection', socket => {
  console.log('New client connected')

  socket.on(c.SOCKET_EVENTS.START_ROOM, config =>
    actions.startRoom(socket, config)
  )
  socket.on(c.SOCKET_EVENTS.LEAVE_ROOM, config =>
    actions.leaveRoom(socket, config)
  )
  socket.on(c.SOCKET_EVENTS.JOIN_ROOM, config =>
    actions.joinRoom(socket, config)
  )
  socket.on(c.SOCKET_EVENTS.START_GAME, config =>
    actions.startGame(socket, config)
  )
  socket.on(c.SOCKET_EVENTS.ADD_WORD_SCORE, config =>
    actions.addWordScore(socket, config)
  )

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
