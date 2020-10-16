import WelcomeScreen from '../ui/WelcomeScreen'
import { connect } from 'react-redux'
import { changeError, changeUserName } from '../../actions'

const mapStateToProps = state => ({
  userName: state.userName,
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({
  changeError (error) {
    dispatch(changeError(error))
  },
  changeUserName (userName) {
    dispatch(changeUserName(userName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
