import React, { Component } from 'react'
import '../../stylesheets/Scorecard.scss'

export default class ScoreEntry extends Component {
  render () {
    return (
      <div className='scoreEntry'>
        <div
          className={`scoreWord ${
            this.props.score.score < 0 ? 'badWord' : 'goodWord'
          }`}
        >
          {this.props.score.word.toLowerCase()}
        </div>
        <div className={this.props.score.score < 0 ? 'badScore' : 'goodScore'}>
          {this.props.score.score}
        </div>
      </div>
    )
  }
}
