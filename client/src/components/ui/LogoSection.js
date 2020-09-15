import React from 'react'
import '../../stylesheets/LogoSection.scss'
import logo from '../../img/merriam-webster.png' // Tell webpack this JS file uses this image

export default class LogoSection extends React.Component {
  componentDidMount () {
    const script = document.createElement('script')

    script.src = 'https://www.powr.io/powr.js?platform=react'
    script.async = true

    document.body.appendChild(script)
  }
  render () {
    return (
      <div className='centeredColumn'>
        <span className='poweredByText'>Powered By</span>
        <a href='https://dictionaryapi.com/' target='_blank'>
          <img src={logo} alt='Logo' className='logo' />
        </a>
        <div class='powr-hit-counter' id='094d5e9f_1600189066'></div>
      </div>
    )
  }
}
