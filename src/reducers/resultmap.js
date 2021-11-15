import { SET_MAP_POSITION } from "../constants/actionTypes"

const defaultState = {
	mapPosition: [-39.208847057702286, 176.76727294921878],
}

const resultMap = (state = defaultState, action) => {
	switch (action.type) {
		case SET_MAP_POSITION:
			return {
				...state,
				mapPosition: action.payload,
			}
		default:
			return state
	}
}

export default resultMap