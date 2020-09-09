import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class Tile extends Component {
  constructor (props) {
    super(props)

    this.handleTileAdd = this.handleTileAdd.bind(this)
  }

  handleTileAdd () {
    let word = []

    for (let i = 0; i < this.props.currentWord.length; i++) {
      word.push([this.props.currentWord[i][0]])
    }
    word.push([this.props.index])

    this.props.changeCurrentWord(word)
  }

  render () {
    return (
      <div
        className={`${this.props.clickable ? 'clickableTile' : 'disabledTile'}
          ${this.props.alreadyClicked ? 'clickedTile' : ''}
        `}
        onClick={
          this.props.lastOneClicked
            ? this.props.removeFromCurrentWord
            : this.props.clickable
            ? this.handleTileAdd
            : null
        }
      >
        {this.props.letter}
      </div>
    )
  }
}
