import React from 'react'
import '../../stylesheets/WelcomeScreen.scss'
import Button from './Button'
import EnterRoomSection from '../containers/EnterRoomSection'

export default class WelcomeScreen extends React.Component {
  render () {
    return (
      <div className='welcomeScreen'>
        <EnterRoomSection />
        <span className='separator'>or</span>
        <div className='singlePlayerButton'>
          <Button
            onClick={this.props.startSinglePlayerGame}
            type='alt'
            value='Single Player'
          />
        </div>
      </div>
    )
  }
}
