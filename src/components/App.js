import React from "react"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"

import { APP_LOAD, REDIRECT } from "../constants/actionTypes"

import Home from "./Home"
import ResultMap from "./ResultMap"
import { push } from "connected-react-router"
import Admin from "./Admin"
import Navigation from "./Navigation"
import Footer from "./Footer"

const mapStateToProps = state => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
		redirectTo: state.common.redirectTo,
	}
}

const mapDispatchToProps = dispatch => ({
	onLoad: () =>
		dispatch({ type: APP_LOAD }),
	redirect: (url) => {
		dispatch( push(url) )
		dispatch({ type: REDIRECT })
	},
})

class App extends React.Component {
	constructor() {
		super()
		this.state = {}
		this.navRef = React.createRef()
	}
	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps.redirectTo) {
			nextProps.redirect(nextProps.redirectTo)
		}

		return null
	}

	componentDidMount() {
		this.props.onLoad()
	}

	render() {
		if (this.props.appLoaded) {
			return (<>
				<Navigation />
				<Switch>
					<Route path="/admin" exact component={Admin} />
					<Route path="/map" exact component={ResultMap} />
					<Route path="/" component={Home} />
				</Switch>
				<Footer className="h-12" />
			</>)
		}

		return (<>
			<h1>App is loading</h1>
		</>)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)