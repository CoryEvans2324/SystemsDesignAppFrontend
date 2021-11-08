import { APP_LOAD, REDIRECT } from "../constants/actionTypes"

const defaultState = {
	appName: 'Cory Evans - DOC Experiences',
	appLoaded: false,
}

const common = (state = defaultState, action) => {
	switch (action.type) {
		case APP_LOAD:
			return {
				...state,
				appLoaded: true,
				token: action.token || null,
				currentUser: action.payload ? action.payload : null
			}

		case REDIRECT:
			return { ...state, redirectTo: null }

		default:
			return state
	}
}

export default common