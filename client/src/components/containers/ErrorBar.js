import ErrorBar from '../ui/ErrorBar'
import { connect } from 'react-redux'
import { changeError } from '../../actions'

const mapStateToProps = state => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = dispatch => ({
  changeError (error) {
    dispatch(changeError(error))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar)
