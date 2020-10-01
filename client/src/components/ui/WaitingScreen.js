import React from 'react'
import '../../stylesheets/WaitingScreen.scss'
import Button from './Button'
import PlayerIcon from '../containers/PlayerIcon'

export default class WaitingScreen extends React.Component {
  constructor (props) {
    super(props)

    this.handleEnterPress = this.handleEnterPress.bind(this)
  }

  componentDidMount () {
    // Clear any displayed errors when this screen first loads
    this.props.changeError('')

    document.addEventListener('keydown', this.handleEnterPress)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleEnterPress)
  }

  handleEnterPress (event) {
    if (event.keyCode === 13) {
      this.startGame()
    }
  }

  render () {
    return (
      <div className='waitingScreen'>
        <span
          className={
            this.props.theme === 'classic' || this.props.theme === 'beach'
              ? 'roomLabelStandard'
              : 'roomLabelDarkTheme'
          }
        >
          Lobby for <b>{this.props.room.name}</b>
        </span>
        <div className='playersDisplay'>
          {this.props.room.players.map((player, index) => (
            <PlayerIcon key={index} name={player.name} />
          ))}
        </div>
        {this.props.room.players[0].name === this.props.userName ? (
          <div className='startGameButton'>
            <span
              className={
                this.props.theme === 'classic' || this.props.theme === 'beach'
                  ? 'hostMessageStandard'
                  : 'hostMessageDarkTheme'
              }
            >
              Send your friends the room name!
            </span>
            <Button
              onClick={this.props.startGame}
              type='primary'
              value='Start Game'
            />
          </div>
        ) : (
          <span
            className={
              this.props.theme === 'classic' || this.props.theme === 'beach'
                ? 'waitingForHostStandard'
                : 'waitingForHostDarkTheme'
            }
          >
            Waiting for host to start game...
          </span>
        )}
        <div className='leaveGameButton'>
          <Button
            onClick={this.props.leaveGame}
            type='cancel'
            value='Leave Room'
          />
        </div>
      </div>
    )
  }
}
