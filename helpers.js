const app = require('./app.js')

exports.getRoom = roomName => {
  return app.gameState.rooms.filter(room => room.name === roomName)[0]
}

exports.roomExists = roomName => {
  return app.gameState.rooms.some(room => room.name === roomName)
}
