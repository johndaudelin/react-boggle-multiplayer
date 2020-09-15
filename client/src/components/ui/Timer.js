import React, { Component } from 'react'
import SocketContext from '../socket-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import '../../stylesheets/GameScreen.scss'

class Timer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.socket.on('TIMER_UPDATE', room => {
      this.props.updateRoom(room)
    })
  }

  render () {
    const timer =
      this.props.mode === 'multi'
        ? this.props.roomTimer
        : this.props.singlePlayerTimer
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return (
      <div className='timer'>
        <FontAwesomeIcon icon={faHourglassHalf} />
        <span className={'timerText'}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    )
  }
}

export default function (props) {
  return (
    <SocketContext.Consumer>
      {socket => <Timer {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}
