import React from 'react'
import Header from './Header'
import LogoSection from './LogoSection'
import WelcomeScreen from './WelcomeScreen'
import WaitingScreen from '../containers/WaitingScreen'
import GameScreen from '../containers/GameScreen'
import FinishedScreen from '../containers/FinishedScreen'
import SocketContext from '../socket-context'
import '../../stylesheets/index.scss'

class ContentScreen extends React.Component {
  constructor (props) {
    super(props)

    this.startGame = this.startGame.bind(this)
    this.startSinglePlayerGame = this.startSinglePlayerGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.addScorecard = this.addScorecard.bind(this)
  }

  componentDidMount () {
    this.props.socket.on('UPDATE_ROOM_INFO', roomData => {
      this.props.updateRoom(roomData)
    })
    this.props.socket.on('END_GAME', roomData => {
      this.addScorecard()
      this.props.updateRoom(roomData)
    })
  }

  componentWillUnmount () {
    this.leaveGame()
    this.props.socket.disconnect()
  }

  startGame () {
    this.props.socket.emit('START_GAME', {
      roomName: this.props.room.name,
      userName: this.props.userName
    })
  }

  startSinglePlayerGame () {
    if (this.props.mode == 'multi') {
      this.props.changeMode('single')
    } else {
      this.props.initializeTimer()
    }
  }

  leaveGame () {
    if (this.props.mode == 'multi') {
      this.props.socket.emit('LEAVE_ROOM', {
        roomName: this.props.room.name,
        userName: this.props.userName
      })
      this.props.updateRoom(null)
    } else {
      this.props.changeMode('multi')
    }
  }

  addScorecard () {
    this.props.socket.emit('ADD_SCORECARD', {
      roomName: this.props.room.name,
      userName: this.props.userName,
      scorecard: this.props.scorecard
    })
  }

  render () {
    return (
      <div className='app'>
        <div>
          <Header />
          {this.props.mode == 'multi' ? (
            !this.props.room ? (
              <WelcomeScreen
                startSinglePlayerGame={this.startSinglePlayerGame}
              />
            ) : this.props.room.waitingForPlayers ? (
              <WaitingScreen
                startGame={this.startGame}
                leaveGame={this.leaveGame}
              />
            ) : this.props.room.activeGame ? (
              <GameScreen leaveGame={this.leaveGame} />
            ) : (
              <FinishedScreen
                startGame={this.startGame}
                leaveGame={this.leaveGame}
              />
            )
          ) : this.props.singlePlayer.timer > -1 ? (
            <GameScreen leaveGame={this.leaveGame} />
          ) : (
            <FinishedScreen
              startGame={this.startSinglePlayerGame}
              leaveGame={this.leaveGame}
            />
          )}
        </div>
        <LogoSection />
      </div>
    )
  }
}

export default function (props) {
  return (
    <SocketContext.Consumer>
      {socket => <ContentScreen {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}
