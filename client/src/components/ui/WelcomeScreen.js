import React from 'react'
import '../../stylesheets/WelcomeScreen.scss'
import Button from './Button'
import EnterRoomSection from '../containers/EnterRoomSection'

export default class WelcomeScreen extends React.Component {
  render () {
    return (
      <div className='welcomeScreen'>
        <span className='headerText'>Play With Friends</span>
        <EnterRoomSection />
        <span className='separator'></span>
        <span className='headerText'>Play By Yourself</span>
        <div className='singlePlayerButton'>
          <Button
            onClick={this.props.startSinglePlayerGame}
            type='primary'
            value='Start Game'
          />
        </div>
      </div>
    )
  }
}
