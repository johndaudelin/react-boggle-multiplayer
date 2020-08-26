import React from 'react'
import socketIOClient from 'socket.io-client'
import { hot } from 'react-hot-loader'
import SocketContext from './socket-context'
import ContentScreen from './containers/ContentScreen'
import '../stylesheets/index.scss'
import { SERVER_ENDPOINT } from '../constants'

const socket = socketIOClient(SERVER_ENDPOINT)

class App extends React.Component {
  render () {
    return (
      <SocketContext.Provider value={socket}>
        <ContentScreen />
      </SocketContext.Provider>
    )
  }
}

export default hot(module)(App)
