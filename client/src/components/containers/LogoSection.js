import LogoSection from '../ui/LogoSection'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LogoSection)
