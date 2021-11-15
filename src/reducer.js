import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";


import common from "./reducers/common";
import search from "./reducers/search";
import resultMap from "./reducers/resultmap";


const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	map: resultMap,
	search,
	common,
})

export default createRootReducer