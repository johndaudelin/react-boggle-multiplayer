import ContentScreen from '../ui/ContentScreen'
import { connect } from 'react-redux'
import {
  updateRoom,
  changeMode,
  initializeTimer,
  changeError,
  changeUserName
} from '../../actions'

const mapStateToProps = state => ({
  userName: state.userName,
  room: state.room,
  singlePlayer: state.singlePlayer,
  mode: state.mode,
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({
  changeError (error) {
    dispatch(changeError(error))
  },
  updateRoom (roomData) {
    dispatch(updateRoom(roomData))
  },
  changeMode (mode) {
    dispatch(changeMode(mode))
  },
  initializeTimer () {
    dispatch(initializeTimer())
  },
  changeUserName (userName) {
    dispatch(changeUserName(userName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen)
