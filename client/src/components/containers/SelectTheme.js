import SelectTheme from '../ui/SelectTheme'
import { connect } from 'react-redux'
import { changeTheme } from '../../actions'

const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

const mapDispatchToProps = dispatch => ({
  changeTheme (theme) {
    dispatch(changeTheme(theme))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectTheme)
