import React from 'react'
import '../../stylesheets/WelcomeScreen.scss'
import Button from './Button'

export default class WelcomeScreen extends React.Component {
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
      this.props.changeMode('game')
    }
  }

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
