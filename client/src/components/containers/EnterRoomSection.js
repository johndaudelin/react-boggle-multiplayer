import EnterRoomSection from '../ui/EnterRoomSection'
import { connect } from 'react-redux'
import { changeUserName } from '../../actions'

const mapStateToProps = state => ({
  userName: state.userName
})

const mapDispatchToProps = dispatch => ({
  changeUserName (userName) {
    dispatch(changeUserName(userName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterRoomSection)
