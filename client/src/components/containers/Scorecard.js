import Scorecard from '../ui/Scorecard'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  mode: state.mode,
  userName: state.userName,
  totalScore: ownProps.scorecard.reduce(
    (prevSum, score) => prevSum + score.score,
    0
  )
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Scorecard)
