import WordList from '../ui/WordList'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  words: state.scorecard.map(score => score.word)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WordList)
