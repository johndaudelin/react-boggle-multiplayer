// THESE ROUTES CURRENTLY NOT USED

const express = require('express')
const router = express.Router()
const app = require('../app.js')
const helpers = require('../helpers.js')

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200)
})

router
  .route('/room/:roomName/:userName')
  .get((req, res) => {
    if (!helpers.roomExists(req.params.roomName)) {
      res
        .status(403)
        .send(`Room with name "${req.params.roomName}" does not exist`)
    } else {
      res.status(200).send(helpers.getRoom(req.params.roomName))
    }
  })
  .post((req, res) => {
    if (helpers.roomExists(req.params.roomName)) {
      res
        .status(403)
        .send(`Room with name "${req.params.roomName}" already exists`)
    } else {
      const room = {
        name: req.params.roomName,
        players: [
          {
            name: req.params.userName,
            scorecard: []
          }
        ],
        activeGame: false,
        timer: 90,
        board: []
      }
      app.gameState.rooms.push(room)
      res.status(200).send(room)
    }
  })
  .put((req, res) => {
    if (!helpers.roomExists(req.params.roomName)) {
      res
        .status(403)
        .send(`Room with name "${req.params.roomName}" does not exist`)
    } else {
      let room = helpers.getRoom(req.params.roomName)
      room.players.push({
        name: req.params.userName,
        scorecard: []
      })
      res.status(200).send(room)
    }
  })

module.exports = router
