import React from 'react'
import '../../stylesheets/GameScreen.scss'
import Board from '../containers/Board'
import Button from './Button'
import EntryBox from '../containers/EntryBox'
import Timer from '../containers/Timer'
import WordList from '../containers/WordList'
import SocketContext from '../socket-context'
import { LETTERS } from '../../constants'

class GameScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timeInterval: null
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.addScorecard = this.addScorecard.bind(this)
    this.endGame = this.endGame.bind(this)
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
    this.props.initializeScorecard()
    this.props.resetCurrentWord()
    if (this.props.mode === 'single') {
      this.props.initializeBoard()
      this.props.initializeTimer()
      this.setState({
        timeInterval: setInterval(this.props.decreaseTimer, 1000)
      })
    }
    this.props.socket.on('END_GAME', roomData => {
      this.addScorecard()
      this.endGame()
      this.props.updateRoom(roomData)
    })
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentDidUpdate () {
    if (this.props.mode === 'single' && this.props.timer <= 0) {
      // NEED TO DO THIS ON MULTI MODE AS WELL!!
      this.endGame()
    }
  }

  endGame () {
    document.removeEventListener('keydown', this.handleKeyPress)
    if (this.props.mode === 'single') {
      clearInterval(this.state.timeInterval)
      this.props.decreaseTimer() // set singlePlayer.timer = -1 to recognize end of game in GameScreen component
    }
  }

  addScorecard () {
    this.props.socket.emit('ADD_SCORECARD', {
      roomName: this.props.room.name,
      userName: this.props.userName,
      scorecard: this.props.scorecard
    })
  }

  render () {
    return (
      <div className='gameScreen'>
        {this.props.mode === 'multi' ? (
          <span className='roomNotification'>
            You are competing with {this.props.room.players.length - 1} other
            player(s)
          </span>
        ) : null}
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
        <div className='leaveGameSection'>
          <Button
            onClick={() => {
              this.endGame()
              this.props.leaveGame()
            }}
            value={this.props.mode === 'single' ? 'Quit Game' : 'Leave Room'}
            type='cancel'
          />
        </div>
      </div>
    )
  }
}

export default function (props) {
  return (
    <SocketContext.Consumer>
      {socket => <GameScreen {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}
