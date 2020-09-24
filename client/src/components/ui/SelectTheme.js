import React, { Component } from 'react'
import '../../stylesheets/SelectTheme.scss'
import { themes } from '../../constants'

export default class SelectTheme extends Component {
  render () {
    return (
      <div className='selectThemeContainer'>
        <span
          className={
            this.props.theme === 'classic' || this.props.theme === 'beach'
              ? 'themeLabelStandard'
              : 'themeLabelDarkTheme'
          }
        >
          Change Theme
        </span>
        <div className='themeIcons'>
          {themes.map((theme, index) =>
            this.props.theme !== theme ? (
              <div
                key={index}
                className={theme}
                onClick={() => {
                  this.props.changeTheme(theme)
                }}
              ></div>
            ) : null
          )}
        </div>
      </div>
    )
  }
}
