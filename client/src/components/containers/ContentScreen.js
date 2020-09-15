import ContentScreen from '../ui/ContentScreen'
import { connect } from 'react-redux'
import { updateRoom, changeMode, initializeTimer } from '../../actions'

const mapStateToProps = state => ({
  userName: state.userName,
  room: state.room,
  singlePlayer: state.singlePlayer,
  mode: state.mode
})

const mapDispatchToProps = dispatch => ({
  updateRoom (roomData) {
    dispatch(updateRoom(roomData))
  },
  changeMode (mode) {
    dispatch(changeMode(mode))
  },
  initializeTimer () {
    dispatch(initializeTimer())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen)
