import FinishedScreen from '../ui/FinishedScreen'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  mode: state.mode,
  scorecard: state.scorecard,
  totalScore: state.scorecard.reduce(
    (prevSum, score) => prevSum + score.score,
    0
  ),
  room: state.room
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(FinishedScreen)
