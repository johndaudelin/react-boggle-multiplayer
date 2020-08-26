import Board from '../ui/Board'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    board: state.mode == 'multi' ? state.room.board : state.singlePlayer.board
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
