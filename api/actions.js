const app = require('./app.js')
const { roomExists, getRoom } = require('./helpers.js')
const c = require('./constants.js')

exports.startRoom = (socket, config) => {
  if (roomExists(config.roomName)) {
    console.log(
      `User ${config.userName} tried creating already existing room ${config.roomName}`
    )
  } else {
    const room = {
      name: config.roomName,
      players: [
        {
          name: config.userName,
          scorecard: []
        }
      ],
      activeGame: false,
      timer: 90,
      board: []
    }

    console.log(`User ${config.userName} starting new room ${config.roomName}`)

    app.gameState.rooms.push(room)
    socket.join(config.roomName)
    socket.emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
  }
}

exports.leaveRoom = (socket, config) => {
  if (!roomExists(config.roomName)) {
    console.log(
      `User ${config.userName} tried leaving non-existant room ${config.roomName}`
    )
  } else {
    let room = getRoom(config.roomName)

    console.log(`User ${config.userName} leaving ${config.roomName}`)

    room.players = room.players.filter(
      player => player.name !== config.userName
    )
    socket.leave(config.roomName)
    socket.to(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
  }
}

exports.joinRoom = (socket, config) => {
  if (!roomExists(config.roomName)) {
    console.log(
      `User ${config.userName} tried joining non-existant room ${config.roomName}`
    )
  } else {
    let room = getRoom(config.roomName)
    if (room.players.some(player => player.name === config.userName)) {
      console.log(
        `User ${config.userName} tried joining ${config.roomName} twice.`
      )
    } else {
      console.log(`User ${config.userName} joining ${config.roomName}`)

      room.players.push({
        name: config.userName,
        scorecard: []
      })
      socket.join(config.roomName)
      app.io.in(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
    }
  }
}

exports.startGame = (socket, config) => {
  // TODO: add checking for whether this is the host of the room
  if (roomExists(config.roomName)) {
    let room = getRoom(config.roomName)
    if (room.activeGame === true) {
      console.log(
        `User ${config.userName} tried to start an already begun game in ${config.roomName}`
      )
    } else {
      console.log(`User ${config.userName} starting game in ${config.roomName}`)

      room.activeGame = true

      room.board = []
      for (let i = 0; i < 16; i++) {
        room.board.push(c.TILES[i].charAt(Math.floor(Math.random() * 6)))
      }

      app.io.in(config.roomName).emit(c.SOCKET_EVENTS.START_GAME, room)

      app.intervals[config.roomName] = setInterval(() => {
        room.timer--
        if (room.timer === 0) {
          room.activeGame = false
          room.timer = 90
          app.io.in(config.roomName).emit(c.SOCKET_EVENTS.END_GAME, room)
          clearInterval(app.intervals[config.roomName])
        } else {
          app.io
            .in(config.roomName)
            .emit(c.SOCKET_EVENTS.TIMER_UPDATE, room.timer)
        }
      }, 1000)
    }
  }
}

exports.addWordScore = (socket, config) => {
  if (roomExists(config.roomName)) {
    let room = getRoom(config.roomName)
    let player = room.players.filter(
      player => player.name === config.userName
    )[0]
    player.scorecard.push(config.wordScore)
  }
}
