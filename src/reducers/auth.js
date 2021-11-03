import {
	UPDATE_AUTH_FIELD,
	LOGIN,
	REGISTER,
	LOGIN_PAGE_UNLOADED,
	REGISTER_PAGE_UNLOADED,
	ASYNC_START,
} from "../constants/actionTypes";

const defaultState = {
	username: '',
	password: ''
}

const auth = (state = defaultState, action) => {
	switch (action.type) {
		case LOGIN:
		case REGISTER:
			return {
				...state,
				inProgress: false,
				errors: action.error ? action.payload.errors : null
			}
		
		case UPDATE_AUTH_FIELD:
			return {
				...state,
				[action.key]: action.value
			}

		case LOGIN_PAGE_UNLOADED:
		case REGISTER_PAGE_UNLOADED:
			return {
				username: '',
				password: ''
			}

		case ASYNC_START:
			return {...state, inProgress: true}

		default:
			return state
	}
}

export default auth