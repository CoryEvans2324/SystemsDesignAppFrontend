import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { LOGOUT } from "../constants/actionTypes"

const mapStateToProps = state => ({
	appName: state.common.appName,
	currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
	onClickLogout: () => dispatch({ type: LOGOUT })
})

class Home extends React.Component {
	render() {
		return (<>
			<h1>This is the home page</h1>
			<h2>Welcome {this.props.currentUser?.username}</h2>
			<Link to="/register">
				Link to register
			</Link>
			<br></br>
			<Link to="/login">
				Link to login
			</Link>
			<br />
			<button
				onClick={this.props.onClickLogout}
			>
				Logout
			</button>
		</>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)