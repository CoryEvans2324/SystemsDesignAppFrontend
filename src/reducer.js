import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";


import common from "./reducers/common";
import search from "./reducers/search";


const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	search,
	common,
})

export default createRootReducer