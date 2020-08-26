import Timer from '../ui/Timer'
import { connect } from 'react-redux'
import { updateRoom } from '../../actions'

const mapStateToProps = state => ({
  roomTimer: state.room?.timer,
  singlePlayerTimer: state.singlePlayer.timer,
  mode: state.mode
})

const mapDispatchToProps = dispatch => ({
  updateRoom (room) {
    dispatch(updateRoom(room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
