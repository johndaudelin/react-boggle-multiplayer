import Scorecard from '../ui/Scorecard'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  scorecard: state.scorecard
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Scorecard)
