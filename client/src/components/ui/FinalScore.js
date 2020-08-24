import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class FinalScore extends Component {
  render () {
    return (
      <div
        className={`${
          this.props.totalScore > 0 ? 'goodScoreBubble' : 'badScoreBubble'
        }`}
      >
        <span>{this.props.totalScore}</span>
      </div>
    )
  }
}
