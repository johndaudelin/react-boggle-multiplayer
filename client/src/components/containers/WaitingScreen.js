import WaitingScreen from '../ui/WaitingScreen'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  room: state.room
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingScreen)
