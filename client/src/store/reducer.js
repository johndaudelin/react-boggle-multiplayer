import { Actions } from '../constants'
import { combineReducers } from 'redux'

export const currentWord = (state = [], action) => {
  switch (action.type) {
    case Actions.CHANGE_CURRENT_WORD:
      return action.payload
    case Actions.REMOVE_FROM_CURRENT_WORD:
      return state.filter((element, index) => index !== state.length - 1)
    case Actions.RESET_CURRENT_WORD:
      return []
    default:
      return state
  }
}

export const scorecard = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_WORD:
      return state.concat([action.payload])
    case Actions.INITIALIZE_SCORECARD:
      return []
    default:
      return state
  }
}

export const userName = (state = '', action) => {
  switch (action.type) {
    case Actions.CHANGE_USERNAME:
      return action.payload
    default:
      return state
  }
}

export const room = (state = null, action) => {
  switch (action.type) {
    case Actions.UPDATE_ROOM:
      return action.payload
    default:
      return state
  }
}

export const singlePlayer = (
  state = {
    board: [],
    timer: 90
  },
  action
) => {
  switch (action.type) {
    case Actions.DECREASE_TIMER:
      return {
        board: [...state.board],
        timer: state.timer - 1
      }
    case Actions.INITIALIZE_TIMER:
      return {
        board: [...state.board],
        timer: 90
      }
    case Actions.INITIALIZE_BOARD:
      return {
        board: action.payload,
        timer: state.timer
      }
    default:
      return state
  }
}

export const mode = (state = 'multi', action) => {
  switch (action.type) {
    case Actions.CHANGE_MODE:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  mode,
  singlePlayer,
  scorecard,
  currentWord,
  userName,
  room
})
