import React, { Component } from 'react'
import ScoreEntry from './ScoreEntry'
import '../../stylesheets/Scorecard.scss'

export default class Scorecard extends Component {
  render () {
    return (
      <div className='scorecard'>
        <span className='scoreCardLabel'>My Scorecard:</span>
        {this.props.scorecard.map((score, key) => (
          <ScoreEntry score={score} key={key} />
        ))}
        <div
          className={`totalScore ${
            this.props.totalScore < 0 ? 'badScore' : 'goodScore'
          }`}
        >
          {this.props.totalScore}
        </div>
      </div>
    )
  }
}
