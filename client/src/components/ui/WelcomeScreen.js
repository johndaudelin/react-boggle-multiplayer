import React from 'react'
import '../../stylesheets/WelcomeScreen.scss'
import Button from './Button'

export default class WelcomeScreen extends React.Component {
  render () {
    return (
      <div className='welcomeScreenButton'>
        <Button
          onClick={() => this.props.changeMode('game')}
          type='primary'
          value='Start Game'
        />
      </div>
    )
  }
}
