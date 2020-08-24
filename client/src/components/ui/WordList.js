import React, { Component } from 'react'
import WordEntry from './WordEntry'
import { animateScroll } from 'react-scroll'
import '../../stylesheets/GameScreen.scss'

export default class WordList extends Component {
  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    animateScroll.scrollToBottom({
      containerId: 'wordList',
      duration: '50'
    })
  }

  render () {
    return (
      <div className='wordList' id='wordList'>
        <span className='wordListLabel'>My Words:</span>
        {this.props.words.map((word, key) => (
          <WordEntry word={word} key={key} />
        ))}
      </div>
    )
  }
}
