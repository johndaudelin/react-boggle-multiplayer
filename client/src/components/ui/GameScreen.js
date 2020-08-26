import React from 'react'
import '../../stylesheets/GameScreen.scss'
import Board from '../containers/Board'
import Button from './Button'
import EntryBox from '../containers/EntryBox'
import Timer from '../containers/Timer'
import WordList from '../containers/WordList'
import { LETTERS } from '../../constants'

export default class GameScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timeInterval: null
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const char = LETTERS[event.keyCode - 65]
      const indexesOfLetter = this.props.board
        .map((letter, index) => (letter === char ? index : -1))
        .filter(index => index !== -1)
      console.log('indexesOfLetter ', indexesOfLetter)
      console.log('currentWord', this.props.currentWord)
      console.log('reachableTiles', this.props.reachableTiles)

      let word = []
      if (this.props.currentWord.length === 0) {
        word.push(indexesOfLetter)
      } else {
        for (let i = 0; i <= this.props.currentWord.length; i++) word.push([])

        console.log('initial empty word ', word)

        for (
          let trackNum = 0;
          trackNum < this.props.reachableTiles.length;
          trackNum++
        ) {
          console.log(
            'reachableTiles[trackNum] ',
            this.props.reachableTiles[trackNum]
          )
          this.props.reachableTiles[trackNum].forEach(reachableTileIndex => {
            if (indexesOfLetter.includes(reachableTileIndex)) {
              for (
                let wordIndex = 0;
                wordIndex < word.length - 1;
                wordIndex++
              ) {
                word[wordIndex].push(
                  this.props.currentWord[wordIndex][trackNum]
                )
              }
              word[word.length - 1].push(reachableTileIndex)
            }
          })
        }
      }
      if (word[0].length > 0) {
        this.props.changeCurrentWord(word)
      }
    } else if (event.keyCode === 8) {
      this.props.removeFromCurrentWord()
    } else if (event.keyCode === 13) {
      if (this.props.currentWord.length > 2) {
        this.props.addWord()
      }
    }
  }

  componentDidMount () {
    this.props.initializeBoard()
    this.props.initializeTimer()
    this.props.initializeScorecard()
    this.props.resetCurrentWord()
    this.setState({
      timeInterval: setInterval(this.props.decreaseTimer, 1000)
    })
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentDidUpdate () {
    if (this.props.timer <= 0) {
      this.endGame()
    }
  }

  endGame () {
    clearInterval(this.state.timeInterval)
    this.props.resetCurrentWord()
    document.removeEventListener('keydown', this.handleKeyPress)
    this.props.changeMode('finished')
  }

  render () {
    return (
      <div className='gameScreen'>
        <Timer />
        <div className='horizontalSection'>
          <div className='leftSide'>
            <Board />
            <div className='boardButtons'>
              <Button
                onClick={this.props.resetCurrentWord}
                disabled={this.props.currentWord.length === 0}
                value='Cancel Word'
                type='cancel'
              />
              <Button
                onClick={this.props.addWord}
                disabled={this.props.currentWord.length < 3}
                value='Submit Word'
                type='primary'
              />
            </div>
          </div>
          <div className='rightSide'>
            <WordList />
            <EntryBox />
          </div>
        </div>
      </div>
    )
  }
}
