import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import '../../stylesheets/GameScreen.scss'

export default class Timer extends Component {
  render () {
    return (
      <div className='timer'>
        <FontAwesomeIcon icon={faHourglassHalf} />
        <span className={'timerText'}>
          {this.props.minutes}:{this.props.seconds.toString().padStart(2, '0')}
        </span>
      </div>
    )
  }
}
