import { Actions } from './constants'
import fetch from 'isomorphic-fetch'
import { animateScroll } from 'react-scroll'
import { API_KEY, CUBES } from './constants'

export const initializeScorecard = () => ({
  type: Actions.INITIALIZE_SCORECARD
})

export const addWord = () => (dispatch, getState) => {
  const state = getState()
  const word = state.currentWord
    .map(arr => arr[0])
    .map(index =>
      state.mode === 'single'
        ? state.singlePlayer.board[index]
        : state.room.board[index]
    )
    .join('')
    .toLowerCase()
  const wordLength = word.length

  // Reject if this word has already been added (or is less than 3 characters)
  if (wordLength > 2 && !state.scorecard.some(score => score.word === word)) {
    let score = 0
    if (wordLength < 5) {
      score = 1
    } else if (wordLength === 5) {
      score = 2
    } else if (wordLength === 6) {
      score = 3
    } else if (wordLength === 7) {
      score = 5
    } else {
      score = 11
    }

    fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`
    )
      .then(response => response.json())
      .then(obj => {
        // If word is not in the dictionary (or is an "abbreviation" or "acronym"), make the score for this word negative
        let badWord = true
        if (obj.length > 0 && obj[0].meta) {
          obj.forEach(object => {
            if (
              object.fl &&
              object.fl != 'abbreviation' &&
              object.fl != 'acronym' &&
              !object.fl.includes('suffix') &&
              !object.fl.includes('name') &&
              object.hwi?.hw &&
              !object.hwi.hw.includes('-') &&
              object.hwi.hw.split(' ').length === 1 &&
              object.hwi.hw[0] === object.hwi.hw[0].toLowerCase()
            ) {
              badWord = false
            }
          })
        }

        if (badWord) {
          score = 0 - score
        }

        dispatch({
          type: Actions.ADD_WORD,
          payload: {
            word,
            score
          }
        })

        animateScroll.scrollToBottom({
          containerId: 'wordList',
          duration: '50'
        })
      })
      .catch(error => {
        // HANDLE ERROR HERE
        console.log(error)
      })
  }

  dispatch(resetCurrentWord())
}

export const removeWord = word => {
  return {
    type: Actions.REMOVE_WORD,
    payload: word
  }
}

export const changeCurrentWord = arrOfIndexes => {
  return {
    type: Actions.CHANGE_CURRENT_WORD,
    payload: arrOfIndexes
  }
}

export const removeFromCurrentWord = () => {
  return {
    type: Actions.REMOVE_FROM_CURRENT_WORD
  }
}

export const resetCurrentWord = () => ({
  type: Actions.RESET_CURRENT_WORD
})

export const decreaseTimer = () => ({
  type: Actions.DECREASE_TIMER
})

export const initializeTimer = () => ({
  type: Actions.INITIALIZE_TIMER
})

export const initializeBoard = () => {
  let tiles = []
  shuffle(CUBES)
  for (let i = 0; i < 16; i++) {
    let char = CUBES[i].charAt(Math.floor(Math.random() * 6))
    if (char === 'Q') {
      char = 'Qu'
    }
    tiles.push(char)
  }

  return {
    type: Actions.INITIALIZE_BOARD,
    payload: tiles
  }
}

export const changeUserName = userName => ({
  type: Actions.CHANGE_USERNAME,
  payload: userName
})

export const updateRoom = roomObj => ({
  type: Actions.UPDATE_ROOM,
  payload: roomObj
})

export const changeMode = mode => ({
  type: Actions.CHANGE_MODE,
  payload: mode
})

export const changeTheme = theme => ({
  type: Actions.CHANGE_THEME,
  payload: theme
})

export const changeError = error => ({
  type: Actions.CHANGE_ERROR,
  payload: error
})

// Helper function used to shuffle boggle cubes
// Sourced from https://javascript.info/task/shuffle
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let t = array[i]
    array[i] = array[j]
    array[j] = t
  }
}
