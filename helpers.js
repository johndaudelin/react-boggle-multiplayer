const app = require('./app.js')

exports.getRoom = roomName => {
  return app.gameState.rooms.filter(room => room.name === roomName)[0]
}

exports.roomExists = roomName => {
  return app.gameState.rooms.some(room => room.name === roomName)
}

// Helper function used to shuffle boggle cubes
// Sourced from https://javascript.info/task/shuffle
exports.shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let t = array[i]
    array[i] = array[j]
    array[j] = t
  }
}
