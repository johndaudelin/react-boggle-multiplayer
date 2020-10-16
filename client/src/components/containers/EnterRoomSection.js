import EnterRoomSection from '../ui/EnterRoomSection'
import { connect } from 'react-redux'
import { changeUserName } from '../../actions'

const mapStateToProps = state => ({
  userName: state.userName,
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterRoomSection)
