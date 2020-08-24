import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class WordEntry extends Component {
  render () {
    return <div className='wordEntry'>{this.props.word.toLowerCase()}</div>
  }
}
