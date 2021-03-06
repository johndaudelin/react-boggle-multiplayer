import EntryBox from '../ui/EntryBox'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  currentWord: state.currentWord
    .map(indexes =>
      state.mode === 'single'
        ? state.singlePlayer.board[indexes[0]]
        : state.room.board[indexes[0]]
    )
    .join('')
    .toLowerCase()
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EntryBox)
