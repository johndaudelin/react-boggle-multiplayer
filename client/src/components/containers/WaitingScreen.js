import WaitingScreen from '../ui/WaitingScreen'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  userName: state.userName,
  room: state.room,
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingScreen)
