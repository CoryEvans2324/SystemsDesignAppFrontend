import { APP_LOAD, REDIRECT, LOGIN, REGISTER, LOGOUT } from "../constants/actionTypes"

const defaultState = {
	appName: 'React Redux Template',
	appLoaded: false,
	token: null
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
		
		case REGISTER:
		case LOGIN:
			return {
				...state,
				redirectTo: action.error ? null : '/',
				token: action.error ? null : action.payload.token,
				currentUser: action.error ? null : action.payload.user
			}

		case LOGOUT:
			return {
				...state,
				token: null,
				currentUser: null,
				redirectTo: '/'
			}
		default:
			return state
	}
}

export default common