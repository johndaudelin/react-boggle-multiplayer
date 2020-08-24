import React, { Component } from 'react'
import TileRow from './TileRow'
import '../../stylesheets/GameScreen.scss'

export default class Board extends Component {
  render () {
    return (
      <div className='board'>
        <TileRow tiles={this.props.board.slice(0, 4)} rowNum={0} />
        <TileRow tiles={this.props.board.slice(4, 8)} rowNum={1} />
        <TileRow tiles={this.props.board.slice(8, 12)} rowNum={2} />
        <TileRow tiles={this.props.board.slice(12, 16)} rowNum={3} />
      </div>
    )
  }
}
