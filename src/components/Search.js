import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { ADD_SEARCH_FEATURE, REMOVE_SEARCH_FEATURE, UPDATE_SEARCH_FIELD } from "../constants/actionTypes";


const mapStateToProps = state => ({
	...state.search
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
	},
	addFeatureToSearch: (feature) => {
		dispatch({
			type: ADD_SEARCH_FEATURE,
			payload: {
				feature
			}
		})
		dispatch({
			type: UPDATE_SEARCH_FIELD,
			payload: {
				field: 'featureSearch',
				value: ''
			}
		})
	},
	removeFeatureFromSearch: (feature) => {
		dispatch({
			type: REMOVE_SEARCH_FEATURE,
			payload: {
				feature
			}
		})
	}
})

const all_features = [
	'lake',
	'waterfall'
]

class Search extends React.Component {
	constructor() {
		super()
		this.submitForm = (e) => {
			e.preventDefault()
			this.props.search()
		}
	}
	featureOnChange = (e) => {
		this.props.handleChange({
			target: {
				name: 'featureSearch',
				value: e.target.value
			}
		})
	}
	render() {
		return (
		<div className="mt-4 max-w-lg mx-auto">
			<h1>Search for a track</h1>
			<form className="m-2 flex flex-col space-y-2" onSubmit={this.submitForm}>
				<div className="grid grid-cols-2 gap-1">
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
				<div className="flex flex-col space-y-2">
					<h2>Features</h2>
					<ul className="flex flex-wrap">
						{this.props.features.map((feature, i) =>
							<li key={i} className="px-2 rounded-full bg-gray-200 mx-1 flex items-center space-x-2 cursor-pointer"
								onClick={() => this.props.removeFeatureFromSearch(feature)}
							>
								<span>{feature}</span>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</li>
						)}
					</ul>
					<div className="flex flex-col relative">
						<input
							type="text"
							className="placeholder-shown:italic"
							value={this.props.featureSearch}
							onChange={this.featureOnChange}
							placeholder="Add a search tag"
						/>
						<ul className="absolute top-full left-0 w-full overflow-auto max-h-[120px] bg-white rounded-lg shadow-lg z-10 divide-y">
							{all_features.filter(feature => this.props.featureSearch && feature.includes(this.props.featureSearch) && !this.props.features.includes(feature)).map((feature, i) =>
								<li key={i} className="px-2 py-1 cursor-pointer" onClick={() => this.props.addFeatureToSearch(feature)}>
									<span>{feature}</span>
								</li>
							)}
						</ul>
					</div>
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