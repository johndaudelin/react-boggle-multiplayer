import React from 'react'
import { hot } from 'react-hot-loader'
import ContentScreen from './containers/ContentScreen'
import '../stylesheets/index.scss'

class App extends React.Component {
  render () {
    return <ContentScreen />
  }
}

export default hot(module)(App)
