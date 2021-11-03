import { UPDATE_SEARCH_FIELD } from "../constants/actionTypes"

const defaultState = {
	region: '',
	duration: 'short'
}

const search = (state = defaultState, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_FIELD:
			return {
				...state,
				[action.payload.field]: action.payload.value
			}
		default:
			return state
	}
}

export default search