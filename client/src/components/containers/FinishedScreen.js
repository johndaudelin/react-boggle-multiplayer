import FinishedScreen from '../ui/FinishedScreen'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  let rankedPlayers = []
  let winnerNames = []
  if (state.room) {
    rankedPlayers = [...state.room.players]
      .map(player => ({
        name: player.name,
        scorecard: player.scorecard,
        totalScore: player.scorecard.reduce(
          (prevSum, score) => prevSum + score.score,
          0
        )
      }))
      .sort((a, b) => b.totalScore - a.totalScore)

    const winningScore = rankedPlayers[0].totalScore

    winnerNames = rankedPlayers
      .filter(player => player.totalScore === winningScore)
      .map(player => player.name)
  }

  return {
    mode: state.mode,
    scorecard: state.scorecard,
    totalScore: state.scorecard.reduce(
      (prevSum, score) => prevSum + score.score,
      0
    ),
    rankedPlayers,
    host: state.room ? state.room.players[0].name === state.userName : true,
    winnerNames
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(FinishedScreen)
