import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";


import common from "./reducers/common";
import auth from "./reducers/auth";


const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	auth,
	common,
})

export default createRootReducer