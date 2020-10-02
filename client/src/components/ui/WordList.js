import React, { Component } from 'react'
import WordEntry from '../containers/WordEntry'
import '../../stylesheets/GameScreen.scss'

export default class WordList extends Component {
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
