import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { promiseMiddleware } from "./middleware";
import createRootReducer from "./reducer";


export const history = createBrowserHistory()

const myRouterMiddleware = routerMiddleware(history)

const getMiddleware = () => {
	if (process.env.NODE_ENV === 'production') {
		return applyMiddleware(myRouterMiddleware, promiseMiddleware, createLogger())
	}

	return applyMiddleware(myRouterMiddleware, promiseMiddleware)
}


export const store = createStore(
	createRootReducer(history),
	composeWithDevTools(getMiddleware())
)
