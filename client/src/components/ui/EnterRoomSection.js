import React from 'react'
import Button from './Button'
import SocketContext from '../socket-context'
import '../../stylesheets/WelcomeScreen.scss'

class EnterRoomSection extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      roomName: ''
    }

    this.handleRoomInput = this.handleRoomInput.bind(this)
    this.handleNameInput = this.handleNameInput.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  handleRoomInput (event) {
    this.setState({
      roomName: event.target.value
    })
  }

  handleNameInput (event) {
    this.props.changeUserName(event.target.value)
  }

  joinRoom () {
    this.props.socket.emit('ENTER_ROOM', {
      roomName: this.state.roomName,
      userName: this.props.userName
    })
  }

  render () {
    return (
      <div className='enterRoomSection'>
        <input
          type='text'
          placeholder='Enter your name'
          value={this.props.userName}
          onChange={this.handleNameInput}
        />
        <input
          type='text'
          placeholder='Enter room name'
          value={this.state.roomName}
          onChange={this.handleRoomInput}
        />
        <Button onClick={this.joinRoom} type='primary' value='Enter Room' />
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
