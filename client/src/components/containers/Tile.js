import Tile from '../ui/Tile'
import { connect } from 'react-redux'
import { removeFromCurrentWord, changeCurrentWord } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  const tileIndex = ownProps.index
  const wordLength = state.currentWord.length
  const prevIndex = wordLength === 0 ? -1 : state.currentWord[wordLength - 1][0]
  let reachableTiles = []

  // All tiles are clickable if no tile has been selected yet
  if (prevIndex === -1) {
    reachableTiles = [...Array(16).keys()]
  } else {
    if (prevIndex % 4 !== 3) {
      reachableTiles.push(prevIndex + 1)
      if (prevIndex > 3) reachableTiles.push(prevIndex - 3)
      if (prevIndex < 11) reachableTiles.push(prevIndex + 5)
    }
    if (prevIndex % 4 !== 0) {
      reachableTiles.push(prevIndex - 1)
      if (prevIndex > 4) reachableTiles.push(prevIndex - 5)
      if (prevIndex < 12) reachableTiles.push(prevIndex + 3)
    }
    if (prevIndex > 3) {
      reachableTiles.push(prevIndex - 4)
    }
    if (prevIndex < 12) {
      reachableTiles.push(prevIndex + 4)
    }
  }

  const lastOneClicked = prevIndex === tileIndex
  const alreadyClicked = state.currentWord.some(
    indexes => indexes[0] === tileIndex
  )
  const clickable =
    lastOneClicked || (reachableTiles.includes(tileIndex) && !alreadyClicked)

  return {
    clickable,
    lastOneClicked,
    alreadyClicked,
    currentWord: state.currentWord
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeFromCurrentWord () {
    dispatch(removeFromCurrentWord())
  },
  changeCurrentWord (arrOfIndexes) {
    dispatch(changeCurrentWord(arrOfIndexes))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
