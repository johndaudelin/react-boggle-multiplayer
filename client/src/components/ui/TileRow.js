import React, { Component } from 'react'
import '../../stylesheets/GameScreen.scss'
import Tile from '../containers/Tile'

export default class TileRow extends Component {
  render () {
    return (
      <div className='tileRow'>
        {this.props.tiles.map((letter, index) => (
          <Tile
            key={index}
            index={index + this.props.rowNum * 4}
            letter={letter}
          />
        ))}
      </div>
    )
  }
}
