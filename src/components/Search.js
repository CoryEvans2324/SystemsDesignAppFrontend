import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { UPDATE_SEARCH_FIELD } from "../constants/actionTypes";


const mapStateToProps = state => ({
	search: state.search
})

const mapDispatchToProps = dispatch => ({
	search: () =>
		dispatch(push('/map')),
	handleChange: event => {
		dispatch({
			type: UPDATE_SEARCH_FIELD,
			payload: {
				field: event.target.name,
				value: event.target.value
			}
		})
	}
})

class Search extends React.Component {
	constructor() {
		super()
		this.submitForm = (e) => {
			e.preventDefault()
			this.props.search()
		}
	}
	render() {
		const features = [
			'lake', 'waterfall'
		]	
		return (
		<div className=" max-w-lg mx-auto">
			<h1>Search for a track</h1>
			<form className="m-2 flex flex-col space-y-2" onSubmit={this.submitForm}>
				<div className="grid grid-cols-2">
					<label>Region</label>
					<select name="region" onChange={this.props.handleChange}>
						<option value="">Select a region</option>
						<option value="HB">Hawkes Bay</option>
					</select>

					<label>Duration</label>
					<select name="duration" onChange={this.props.handleChange}>
						<option value="short">1h</option>
						<option value="medium">1-3h</option>
						<option value="long">4h+</option>
					</select>
				</div>
				<div>
					<h2>Features</h2>
					<ul className="flex flex-wrap">
						{features.map((feature, i) =>
							<li key={i} className="px-2 rounded-full bg-gray-200 mx-1 flex items-center space-x-2 cursor-pointer">
								<span>{feature}</span>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</li>
						)}
					</ul>
				</div>
				<button
					className="bg-blue-600 text-white font-semibold py-2 rounded shadow"
					type="submit"
				>
					Search
				</button>
			</form>
		</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);