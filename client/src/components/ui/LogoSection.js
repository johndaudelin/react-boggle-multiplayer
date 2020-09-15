import React from 'react'
import '../../stylesheets/LogoSection.scss'
import logo from '../../img/merriam-webster.png' // Tell webpack this JS file uses this image

export default class LogoSection extends React.Component {
  render () {
    return (
      <div className='centeredColumn'>
        <span className='poweredByText'>Powered By</span>
        <a href='https://dictionaryapi.com/' target='_blank'>
          <img src={logo} alt='Logo' className='logo' />
        </a>
      </div>
    )
  }
}
