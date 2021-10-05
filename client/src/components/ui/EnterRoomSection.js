import React from 'react'
import Button from './Button'
import SocketContext from '../socket-context'
import '../../stylesheets/WelcomeScreen.scss'

class EnterRoomSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roomName: '',
    }

    this.handleRoomInput = this.handleRoomInput.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.joinRandomRoom = this.joinRandomRoom.bind(this)
  }

  handleRoomInput(event) {
    this.setState({
      roomName: event.target.value,
    })
  }

  joinRoom() {
    this.props.socket.emit('ENTER_ROOM', {
      roomName: this.state.roomName,
      userName: this.props.userName,
    })
  }

  joinRandomRoom() {
    this.props.socket.emit('ENTER_ROOM', {
      roomName: null,
      userName: this.props.userName,
    })
  }

  render() {
    return (
      <div className='enterRoomSection'>
        <div className='customRoomSection'>
          <div className='enterRoomNameBox'>
            <input
              type='text'
              placeholder='Enter room name'
              value={this.state.roomName}
              onChange={this.handleRoomInput}
              maxLength='14'
            />
          </div>
          <div className='enterRoomButton'>
            <Button onClick={this.joinRoom} type='alt' value='Enter Room' />
          </div>
        </div>
        <div
          className={
            this.props.theme === 'classic' || this.props.theme === 'beach'
              ? 'orSeparatorStandard'
              : 'orSeparatorDarkTheme'
          }
        ></div>
        <div className='randomRoomSection'>
          <Button
            onClick={this.joinRandomRoom}
            type='alt'
            value='Join Random'
          />
        </div>
      </div>
    )
  }
}

export default function (props) {
  return (
    <SocketContext.Consumer>
      {socket => <EnterRoomSection {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}
