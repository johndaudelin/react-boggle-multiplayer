import React, { Component } from 'react'
import ScoreEntry from './ScoreEntry'
import '../../stylesheets/Scorecard.scss'

export default class Scorecard extends Component {
  render () {
    return (
      <div className='scorecard'>
        <div
          className={
            this.props.totalScore <= 0
              ? 'badScorecardHeader'
              : 'goodScorecardHeader'
          }
        >
          <span className='scorecardHeaderLabel'>
            {this.props.mode === 'single'
              ? 'My Scorecard'
              : this.props.name === this.props.userName
              ? 'Me'
              : this.props.name}
          </span>
          <span className='totalScore'>{this.props.totalScore}</span>
        </div>
        <div className='scorecardBody'>
          {this.props.scorecard.map((score, key) => (
            <ScoreEntry score={score} key={key} />
          ))}
        </div>
      </div>
    )
  }
}
