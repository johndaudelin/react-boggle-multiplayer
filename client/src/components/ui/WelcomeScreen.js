import React from 'react'
import '../../stylesheets/WelcomeScreen.scss'
import Button from './Button'
import EnterRoomSection from '../containers/EnterRoomSection'

export default class WelcomeScreen extends React.Component {
  render () {
    return (
      <div className='welcomeScreen'>
        <EnterRoomSection />
        <Button
          onClick={this.props.startSinglePlayerGame}
          type='primary'
          value='Play Single Player'
        />
      </div>
    )
  }
}
