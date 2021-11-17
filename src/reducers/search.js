import { ADD_SEARCH_FEATURE, REMOVE_SEARCH_FEATURE, UPDATE_SEARCH_FIELD } from "../constants/actionTypes"

const defaultState = {
	region: '[-39, 176]',
	duration: 'short',
	featureSearch: '',
	features: [],
}

const search = (state = defaultState, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_FIELD:
			return {
				...state,
				[action.payload.field]: action.payload.value
			}
		case ADD_SEARCH_FEATURE:
			return {
				...state,
				features: [...state.features, action.payload.feature]
			}
		case REMOVE_SEARCH_FEATURE:
			return {
				...state,
				features: state.features.filter(feature => feature !== action.payload.feature)
			}
		default:
			return state
	}
}

export default search