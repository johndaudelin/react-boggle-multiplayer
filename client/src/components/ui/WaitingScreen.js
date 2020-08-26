import React from 'react'
import '../../stylesheets/WaitingScreen.scss'
import Button from './Button'
import PlayerIcon from './PlayerIcon'

export default class WaitingScreen extends React.Component {
  constructor (props) {
    super(props)

    this.handleEnterPress = this.handleEnterPress.bind(this)
  }

  componentDidMount () {
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
        <div className='playersDisplay'>
          {this.props.room.players.map((player, index) => (
            <PlayerIcon key={index} name={player.name} />
          ))}
        </div>
        <div className='startGameButton'>
          <Button
            onClick={this.props.startGame}
            type='primary'
            value='Start Game'
          />
        </div>
        <div className='leaveGameButton'>
          <Button
            onClick={this.props.leaveGame}
            type='primary'
            value='Leave Game'
          />
        </div>
      </div>
    )
  }
}
