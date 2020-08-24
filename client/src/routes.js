import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './components'
import { hot } from 'react-hot-loader'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route path='/' component={App} />
      </BrowserRouter>
    )
  }
}

export default hot(module)(Routes)
