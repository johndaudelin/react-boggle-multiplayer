import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class EntryBox extends Component {
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
