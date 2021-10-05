import React from 'react'
import Button from './Button'
import '../../stylesheets/WelcomeScreen.scss'
import EnterRoomSection from '../containers/EnterRoomSection'

export default class PlayOnlineScreen extends React.Component {
  constructor(props) {
    super(props)

    this.handleNameInput = this.handleNameInput.bind(this)
  }

  componentDidMount() {
    // Clear any displayed errors when this screen first loads
    this.props.changeError('')
  }

  handleNameInput(event) {
    this.props.changeUserName(event.target.value)
  }

  render() {
    return (
      <div className='welcomeScreen'>
        <div className='nameEntryBox'>
          <input
            type='text'
            placeholder='Enter your name'
            value={this.props.userName}
            onChange={this.handleNameInput}
            maxLength='14'
          />
        </div>
        <EnterRoomSection />
        <div className='returnButton'>
          <Button
            onClick={this.props.exitMultiMode}
            type='cancel'
            value='Return'
          />
        </div>
      </div>
    )
  }
}
