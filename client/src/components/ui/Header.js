import React from 'react'
import '../../stylesheets/Header.scss'

export default class GameScreen extends React.Component {
  render () {
    return (
      <div
        className={
          this.props.theme === 'classic' || this.props.theme === 'beach'
            ? 'headerStandard'
            : 'headerDarkTheme'
        }
      >
        Boggle
      </div>
    )
  }
}
