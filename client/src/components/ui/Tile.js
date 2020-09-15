import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class Tile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      clicked: true
    }

    this.handleTileAdd = this.handleTileAdd.bind(this)
    this.handlePointerMove = this.handlePointerMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleTouch = this.handleTouch.bind(this)
  }

  componentDidMount () {
    document.addEventListener('touchmove', this.handlePointerMove)
    // Disables double tap to zoom functionality
    document.addEventListener('touchend', this.handleTouch)
    document.addEventListener('mousedown', this.handleMouseDown)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount () {
    document.removeEventListener('touchmove', this.handlePointerMove)
    document.removeEventListener('mousedown', this.handleMouseDown)
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('touchend', this.handleTouch)
  }

  handleTouch (event) {
    if (!this.state.clicked) {
      event.preventDefault()
      event.target.click()
      this.setState({
        clicked: true
      })
      console.log(event.target)
    }
  }

  handleMouseDown (event) {
    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp (event) {
    this.setState({
      mouseDown: false
    })
  }

  handlePointerMove (event) {
    const touch = event.changedTouches[0]
    if (touch) {
      const pointerElement = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      )
      const thisElement = document.getElementById(`tile${this.props.index}`)
      if (pointerElement === thisElement) {
        if (this.props.clickable && !this.props.lastOneClicked) {
          this.handleTileAdd()
        }
      }
    }
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
        id={`tile${this.props.index}`}
        className={`${this.props.clickable ? 'clickableTile' : 'disabledTile'}
          ${this.props.alreadyClicked ? 'clickedTile' : ''}
        `}
        onMouseDown={
          this.props.lastOneClicked
            ? this.props.removeFromCurrentWord
            : this.props.clickable
            ? this.handleTileAdd
            : null
        }
        onMouseEnter={
          this.state.mouseDown &&
          !this.props.lastOneClicked &&
          this.props.clickable
            ? this.handleTileAdd
            : null
        }
      >
        {this.props.letter}
      </div>
    )
  }
}
