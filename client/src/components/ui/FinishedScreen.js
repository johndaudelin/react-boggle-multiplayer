import React from 'react'
import FinalScore from './FinalScore'
import Scorecard from '../containers/Scorecard'
import Button from './Button'
import '../../stylesheets/FinishedScreen.scss'

export default class FinishedScreen extends React.Component {
  render () {
    return (
      <div className='finishedScreen'>
        <div className='congratulations'>
          {this.props.totalScore > 0
            ? 'Congratulations! Your score is'
            : 'Oops! Your score is'}
        </div>
        <div className='finalScoreSection'>
          <FinalScore totalScore={this.props.totalScore} />
        </div>
        <div className='wrapContainer'>
          {this.props.mode == 'single' ? (
            <Scorecard scorecard={this.props.scorecard} />
          ) : (
            this.props.room.players.map((player, key) => (
              <Scorecard
                key={key}
                name={player.name}
                scorecard={player.scorecard}
              />
            ))
          )}
        </div>
        <div className='playAgainButton'>
          <Button
            onClick={this.props.startGame}
            type='primary'
            value='Play Again'
          />
        </div>
        <div className='leaveRoomButton'>
          <Button
            onClick={this.props.leaveGame}
            type='cancel'
            value='Leave Room'
          />
        </div>
      </div>
    )
  }
}
