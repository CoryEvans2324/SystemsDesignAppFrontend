import React from "react";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({})
const mapStateToProps = state => ({})

class ResultMap extends React.Component {
	render() {
		return (
			<div>
				<h1>Map</h1>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultMap);