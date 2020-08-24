import React from 'react'
import Header from './Header'
import LogoSection from './LogoSection'
import WelcomeScreen from './WelcomeScreen'
import GameScreen from '../containers/GameScreen'
import FinishedScreen from '../containers/FinishedScreen'
import '../../stylesheets/index.scss'

export default class ContentScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'welcome'
    }

    this.changeMode = this.changeMode.bind(this)
  }

  changeMode (mode) {
    this.setState({
      mode
    })
  }

  render () {
    return (
      <div className='app'>
        <div>
          <Header />
          {this.state.mode === 'welcome' ? (
            <WelcomeScreen changeMode={this.changeMode} />
          ) : this.state.mode === 'game' ? (
            <GameScreen changeMode={this.changeMode} />
          ) : (
            <FinishedScreen changeMode={this.changeMode} />
          )}
        </div>
        <LogoSection />
      </div>
    )
  }
}
