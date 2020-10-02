import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../stylesheets/GameScreen.scss'

export default class WordEntry extends Component {
  render () {
    return (
      <div className='wordEntry'>
        <span>{this.props.word}</span>
        <FontAwesomeIcon
          className='removeWordButton'
          onClick={() => this.props.removeWord(this.props.word)}
          icon={faTimes}
        />
      </div>
    )
  }
}
