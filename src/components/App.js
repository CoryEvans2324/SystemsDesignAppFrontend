import React from "react"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"

import { APP_LOAD, REDIRECT } from "../constants/actionTypes"
import agent from "../agent"

import Home from "./Home"
import ResultMap from "./ResultMap"
import { push } from "connected-react-router"

const mapStateToProps = state => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
		redirectTo: state.common.redirectTo,
	}
}

const mapDispatchToProps = dispatch => ({
	onLoad: (payload, token) =>
		dispatch({ type: APP_LOAD, payload, token}),
	redirect: (url) => {
		dispatch( push(url) )
		dispatch({ type: REDIRECT })
	}
})

class App extends React.Component {
	state = {}
	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps.redirectTo) {
			nextProps.redirect(nextProps.redirectTo)
		}

		return null
	}

	componentDidMount() {
		const token = window.localStorage.getItem('jwt')
		if (token) {
			agent.setToken(token)
		}

		this.props.onLoad(token ? agent.Auth.current() : null, token)
	}

	render() {
		if (this.props.appLoaded) {
			return (<>
				<Switch>
					<Route path="/map" component={ResultMap} />
					<Route path="/" component={Home} />
				</Switch>
			</>)
		}

		return (<>
			<h1>App is loading</h1>
		</>)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)