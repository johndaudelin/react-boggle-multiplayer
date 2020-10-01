import React from 'react'
import SelectTheme from '../containers/SelectTheme'
import Header from '../containers/Header'
import LogoSection from '../containers/LogoSection'
import WelcomeScreen from '../containers/WelcomeScreen'
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
  }

  componentDidMount () {
    this.props.socket.on('UPDATE_ROOM_INFO', roomData => {
      this.props.updateRoom(roomData)
    })
  }

  componentWillUnmount () {
    this.leaveGame()
  }

  startGame () {
    this.props.socket.emit('START_GAME')
  }

  startSinglePlayerGame () {
    if (this.props.mode === 'multi') {
      this.props.changeMode('single')
    } else {
      this.props.initializeTimer()
    }
  }

  leaveGame () {
    if (this.props.mode === 'multi') {
      this.props.socket.emit('LEAVE_ROOM')
      this.props.updateRoom(null)
    } else {
      this.props.changeMode('multi')
    }
  }

  render () {
    return (
      <div className={`${this.props.theme}App`}>
        <SelectTheme />
        <div>
          <Header />
          {this.props.mode === 'multi' ? (
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
