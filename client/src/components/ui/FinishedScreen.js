import React from 'react'
import FinalScore from './FinalScore'
import Scorecard from '../containers/Scorecard'
import Button from './Button'
import '../../stylesheets/FinishedScreen.scss'

export default class FinishedScreen extends React.Component {
  constructor (props) {
    super(props)

    this.handleEnterPress = this.handleEnterPress.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleEnterPress)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleEnterPress)
  }

  handleEnterPress (event) {
    if (event.keyCode === 13) {
      this.props.changeMode('game')
    }
  }
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
        <div className='horizontallyCentered'>
          <Scorecard totalScore={this.props.totalScore} />
        </div>
        <div className='playAgainButton'>
          <Button
            onClick={() => this.props.changeMode('game')}
            type='primary'
            value='Play Again'
          />
        </div>
      </div>
    )
  }
}
