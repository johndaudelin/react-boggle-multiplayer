const app = require('./app.js')
const { roomExists, getRoom, shuffle } = require('./helpers.js')
const c = require('./constants.js')

joinRoom = (socket, config) => {
  const room = getRoom(config.roomName)

  while (room.players.some(player => player.name === config.userName)) {
    config.userName = config.userName + " (2)"
  }
  
  console.log(`User ${config.userName} joining ${config.roomName}`)

  room.players.push({
    name: config.userName,
    scorecard: []
  })

  socket.roomName = config.roomName
  socket.userName = config.userName
  socket.join(config.roomName)
  socket.emit(c.SOCKET_EVENTS.SEND_FINAL_USERNAME, config.userName)
  app.io.in(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
  return true
}

joinRandomRoom = (socket, config) => {
  const numRooms = app.gameState.rooms.length
  if (numRooms > 0){
    config.roomName = app.gameState.rooms[Math.floor(Math.random() * numRooms)].name
    joinRoom(socket, config)
  } else {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    config.roomName = ""
    for (let i = 0; i < 8; i ++){
      config.roomName += letters[Math.floor(Math.random() * 26)]
    }
    createRoom(socket, config)
  }
}

createRoom = (socket, config) => {
  room = {
    name: config.roomName,
    players: [
      {
        name: config.userName,
        scorecard: []
      }
    ],
    waitingForPlayers: true,
    activeGame: false,
    timer: 90,
    board: []
  }

  console.log(`User ${config.userName} starting new room ${config.roomName}`)
  app.gameState.rooms.push(room)

  socket.roomName = config.roomName
  socket.userName = config.userName
  socket.join(config.roomName)
  app.io.in(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
}

exports.enterRoom = (socket, config) => {
  if (config.roomName === '') {
    const errMsg = 'Must specify a room name.'
    console.log(errMsg)
    socket.emit(c.SOCKET_EVENTS.SEND_ERROR, errMsg)
  } else if (config.userName === '') {
    const errMsg = 'Must specify a user name.'
    console.log(errMsg)
    socket.emit(c.SOCKET_EVENTS.SEND_ERROR, errMsg)
  } else if (config.roomName === null) {
    // Join random room
    joinRandomRoom(socket, config)
  } else if (roomExists(config.roomName)) {
    // Join existing room
    joinRoom(socket, config)
  } else {
    // Create new room
    createRoom(socket, config)
  }
}

exports.leaveRoom = (socket, config) => {
  if (!roomExists(config.roomName)) {
    console.log(
      `User ${config.userName} tried leaving non-existant room ${config.roomName}`
    )
    socket.emit(c.SOCKET_EVENTS.SEND_ERROR, c.GENERIC_ERROR)
  } else {
    let room = getRoom(config.roomName)

    console.log(`User ${config.userName} leaving ${config.roomName}`)

    room.players = room.players.filter(
      player => player.name !== config.userName
    )
    socket.to(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
    socket.leave(config.roomName)
    socket.roomName = null

    if (room.players.length === 0) {
      console.log(
        `Room ${config.roomName} is being deleted because last user left`
      )
      app.gameState.rooms = app.gameState.rooms.filter(
        room => room.name !== config.roomName
      )
      app.intervals[config.roomName] = null
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
      socket.emit(c.SOCKET_EVENTS.SEND_ERROR, c.GENERIC_ERROR)
    } else if (!(room.players[0].name === config.userName)) {
      console.log(
        `Non-host ${config.userName} tried starting game in ${config.roomName}`
      )
      socket.emit(c.SOCKET_EVENTS.SEND_ERROR, c.GENERIC_ERROR)
    } else {
      console.log(`User ${config.userName} starting game in ${config.roomName}`)

      room.activeGame = true
      room.waitingForPlayers = false
      room.timer = 90
      room.players = room.players.map(player => ({
        name: player.name,
        scorecard: []
      }))

      room.board = []
      shuffle(c.CUBES)
      for (let i = 0; i < 16; i++) {
        let char = c.CUBES[i].charAt(Math.floor(Math.random() * 6))
        if (char === 'Q') {
          char = 'Qu'
        }
        room.board.push(char)
      }

      app.io.in(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)

      app.intervals[config.roomName] = setInterval(() => {
        room.timer--
        if (room.timer <= 0) {
          room.activeGame = false
          app.io.in(config.roomName).emit(c.SOCKET_EVENTS.END_GAME, room)
          clearInterval(app.intervals[config.roomName])
        } else {
          app.io.in(config.roomName).emit(c.SOCKET_EVENTS.TIMER_UPDATE, room)
        }
      }, 1000)
    }
  }
}

exports.addScorecard = (socket, config, scorecard) => {
  if (roomExists(config.roomName)) {
    let room = getRoom(config.roomName)
    let player = room.players.filter(
      player => player.name === config.userName
    )[0]
    if (player) {
      player.scorecard = scorecard.scorecard
      app.io.in(config.roomName).emit(c.SOCKET_EVENTS.UPDATE_ROOM_INFO, room)
    } else {
      console.log(
        `Error finding scorecard for ${config.userName} in ${config.roomName}`
      )
      socket.emit(c.SOCKET_EVENTS.SEND_ERROR, c.GENERIC_ERROR)
    }
  }
}
