import WaitingScreen from '../ui/WaitingScreen'
import { connect } from 'react-redux'
import { changeError } from '../../actions'

const mapStateToProps = state => ({
  userName: state.userName,
  room: state.room,
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({
  changeError (error) {
    dispatch(changeError(error))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingScreen)
