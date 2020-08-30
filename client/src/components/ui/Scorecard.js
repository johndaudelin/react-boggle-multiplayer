import React, { Component } from 'react'
import ScoreEntry from './ScoreEntry'
import '../../stylesheets/Scorecard.scss'
import prize from '../../img/prize.png' // Tell webpack this JS file uses this image

export default class Scorecard extends Component {
  render () {
    return (
      <div className='scorecard'>
        {this.props.winner ? (
          <img src={prize} alt='1st Place' className='prize' />
        ) : null}
        <div
          className={`
            ${
              this.props.totalScore <= 0
                ? 'badScorecardHeader'
                : 'goodScorecardHeader'
            } ${this.props.winner ? 'scorecardHeaderWinner' : ''}`}
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
