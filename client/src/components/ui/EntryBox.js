import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'

export default class EntryBox extends Component {
  render () {
    return (
      <div className='entryBox'>
        <input
          type='text'
          placeholder='Type Word'
          value={this.props.currentWord}
          onChange={() => null}
        />
      </div>
    )
  }
}
