import GameScreen from '../ui/GameScreen'
import { connect } from 'react-redux'
import {
  decreaseTimer,
  initializeScorecard,
  initializeBoard,
  initializeTimer,
  addWord,
  resetCurrentWord,
  removeFromCurrentWord,
  changeCurrentWord
} from '../../actions'

const mapStateToProps = state => {
  const wordLength = state.currentWord.length
  const prevIndexes = wordLength === 0 ? [] : state.currentWord[wordLength - 1]
  let reachableTiles = []

  // All tiles are clickable if no tile has been selected yet
  if (prevIndexes.length === 0) {
    reachableTiles.push([...Array(16).keys()])
  } else {
    for (let i = 0; i < prevIndexes.length; i++) {
      const prevIndex = prevIndexes[i]
      reachableTiles.push([])

      if (prevIndex % 4 !== 3) {
        reachableTiles[i].push(prevIndex + 1)
        if (prevIndex > 3) reachableTiles[i].push(prevIndex - 3)
        if (prevIndex < 11) reachableTiles[i].push(prevIndex + 5)
      }
      if (prevIndex % 4 !== 0) {
        reachableTiles[i].push(prevIndex - 1)
        if (prevIndex > 4) reachableTiles[i].push(prevIndex - 5)
        if (prevIndex < 12) reachableTiles[i].push(prevIndex + 3)
      }
      if (prevIndex > 3) {
        reachableTiles[i].push(prevIndex - 4)
      }
      if (prevIndex < 12) {
        reachableTiles[i].push(prevIndex + 4)
      }

      reachableTiles[i] = reachableTiles[i].filter(
        tileIndex =>
          !state.currentWord.map(indexes => indexes[i]).includes(tileIndex)
      )
    }
  }

  return {
    mode: state.mode,
    board: state.mode === 'multi' ? state.room.board : state.singlePlayer.board,
    currentWord: state.currentWord,
    reachableTiles,
    timer: state.mode === 'multi' ? state.room.timer : state.singlePlayer.timer
  }
}

const mapDispatchToProps = dispatch => ({
  decreaseTimer () {
    dispatch(decreaseTimer())
  },
  initializeBoard () {
    dispatch(initializeBoard())
  },
  initializeScorecard () {
    dispatch(initializeScorecard())
  },
  initializeTimer () {
    dispatch(initializeTimer())
  },
  addWord () {
    dispatch(addWord())
  },
  resetCurrentWord () {
    dispatch(resetCurrentWord())
  },
  removeFromCurrentWord () {
    dispatch(removeFromCurrentWord())
  },
  changeCurrentWord (word) {
    dispatch(changeCurrentWord(word))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
