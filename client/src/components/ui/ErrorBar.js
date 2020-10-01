import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../stylesheets/ErrorBar.scss'

export default class SelectTheme extends Component {
  render () {
    return this.props.error === '' ? null : (
      <div className='errorBar'>
        <span className='errorText'>{this.props.error}</span>
        <FontAwesomeIcon
          className='closeError'
          onClick={() => this.props.changeError('')}
          icon={faTimes}
        />
      </div>
    )
  }
}
