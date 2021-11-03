import React from "react"
import { connect } from "react-redux"
import Search from "./Search"

const mapStateToProps = state => ({
	appName: state.common.appName,
})

const mapDispatchToProps = dispatch => ({
	// onClickLogout: () => dispatch({ type: LOGOUT })
})

class Home extends React.Component {
	render() {
		return (<>
			<Search />
		</>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)