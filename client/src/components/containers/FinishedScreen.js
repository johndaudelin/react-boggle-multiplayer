import FinishedScreen from '../ui/FinishedScreen'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  totalScore: state.scorecard.reduce(
    (prevSum, score) => prevSum + score.score,
    0
  )
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(FinishedScreen)
