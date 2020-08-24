import appReducer from './reducer'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleInfo = store => next => action => {
  let result

  console.log(`dispatching action => ${action.type}`)
  console.log('action payload => ', action.payload)
  console.log('state', store.getState())
  result = next(action)

  console.log('state after performing action', store.getState())

  return result
}

export default (initialState = {}) => {
  return applyMiddleware(thunk, consoleInfo)(createStore)(
    appReducer,
    initialState
  )
}
