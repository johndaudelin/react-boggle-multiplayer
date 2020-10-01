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
          {themes.map((theme, index) => (
            <div
              key={index}
              className={
                this.props.theme !== theme ? theme : `${theme} selectedTheme`
              }
              onClick={() => {
                this.props.changeTheme(theme)
              }}
            ></div>
          ))}
        </div>
      </div>
    )
  }
}
