import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import storeFactory from './store'
import { defaultState } from './constants'
import { Provider } from 'react-redux'
import './stylesheets/index.scss'

/*
const initialState = localStorage['redux-store']
  ? JSON.parse(localStorage['redux-store'])
  : defaultState

const saveState = () => {
  const state = JSON.stringify(store.getState())
  localStorage['redux-store'] = state
}
*/

const initialState = defaultState

const store = storeFactory(initialState)

// store.subscribe(saveState)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
