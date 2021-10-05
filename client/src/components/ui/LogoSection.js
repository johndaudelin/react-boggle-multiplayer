import React from 'react'
import '../../stylesheets/LogoSection.scss'

export default class LogoSection extends React.Component {
  componentDidMount() {
    const script = document.createElement('script')

    script.src = 'https://www.powr.io/powr.js?platform=react'
    script.async = true

    document.body.appendChild(script)
  }
  render() {
    return (
      <div className='logoSection'>
        <span className='poweredByText'>
          Powered By{' '}
          <a href='https://dictionaryapi.com/' target='_blank'>
            Merriam-Webster
          </a>
        </span>
      </div>
    )
  }
}
