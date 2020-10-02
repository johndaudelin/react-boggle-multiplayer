import WordEntry from '../ui/WordEntry'
import { connect } from 'react-redux'
import { removeWord } from '../../actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  removeWord (word) {
    dispatch(removeWord(word))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WordEntry)
