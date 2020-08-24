import Timer from '../ui/Timer'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  minutes: Math.floor(state.timer / 60),
  seconds: state.timer % 60
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
