import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class EntryBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      blinking: true
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState(prevState => ({
        blinking: !prevState.blinking
      }))
    }, 500)
  }

  render () {
    return (
      <div className='entryBox'>
        {this.props.currentWord.length > 0 ? (
          <span>{this.props.currentWord}</span>
        ) : (
          <span className='entryBoxPlaceholder'>Type Word</span>
        )}
      </div>
    )
  }
}
