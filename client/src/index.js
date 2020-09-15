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
}*/

const initialState = defaultState

const store = storeFactory(initialState)

// store.subscribe(saveState)

function watchForHover () {
  // lastTouchTime is used for ignoring emulated mousemove events
  // that are fired after touchstart events. Since they're
  // indistinguishable from real events, we use the fact that they're
  // fired a few milliseconds after touchstart to filter them.
  let lastTouchTime = 0

  function enableHover () {
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add('hasHover')
  }

  function disableHover () {
    document.body.classList.remove('hasHover')
  }

  function updateLastTouchTime () {
    lastTouchTime = new Date()
  }

  document.addEventListener('touchstart', updateLastTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)

  enableHover()
}

watchForHover()

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
