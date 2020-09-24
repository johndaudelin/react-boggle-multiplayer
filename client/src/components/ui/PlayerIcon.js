import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../../stylesheets/WaitingScreen.scss'

export default class PlayerIcon extends React.Component {
  render () {
    return (
      <div
        className={
          this.props.theme === 'classic' || this.props.theme === 'beach'
            ? 'playerStandard'
            : 'playerDarkTheme'
        }
      >
        <FontAwesomeIcon className='playerIcon' icon={faUser} />
        <span className='playerName'>{this.props.name}</span>
      </div>
    )
  }
}
