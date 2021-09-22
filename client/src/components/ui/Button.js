import React, { Component } from 'react'
import '../../stylesheets/Button.scss'

export default class Button extends Component {
  render() {
    return (
      <div
        className={`${
          this.props.disabled
            ? 'disabledButton'
            : this.props.type === 'cancel'
            ? 'cancelButton'
            : this.props.type === 'primary'
            ? 'primaryButton'
            : 'altButton'
        } ${this.props.welcomeScreenButton ? 'welcomeScreenButton' : ''}`}
        onClick={this.props.disabled ? null : this.props.onClick}
      >
        {this.props.value}
      </div>
    )
  }
}
