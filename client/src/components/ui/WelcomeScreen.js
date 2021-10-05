import React from 'react'
import '../../stylesheets/WelcomeScreen.scss'
import Button from './Button'

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Clear any displayed errors when this screen first loads
    this.props.changeError('')
  }

  render() {
    return (
      <div className='welcomeScreen'>
        <div className='multiPlayerButton'>
          <Button
            onClick={this.props.enterMultiMode}
            type='alt'
            welcomeScreenButton={true}
            value='Play With Friends'
          />
        </div>
        <div className='singlePlayerButton'>
          <Button
            onClick={this.props.startSinglePlayerGame}
            type='primary'
            welcomeScreenButton={true}
            value='Play By Yourself'
          />
        </div>
      </div>
    )
  }
}
