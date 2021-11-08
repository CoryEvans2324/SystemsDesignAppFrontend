// this middleware was taken from
// https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/middleware.js

import { ASYNC_END, ASYNC_START } from "./constants/actionTypes";

const promiseMiddleware = (store) => (next) => (action) => {
	if (isPromise(action.payload)) {
		store.dispatch({ type: ASYNC_START, subtype: action.type });

		const currentView = store.getState().viewChangeCounter;
		const skipTracking = action.skipTracking;

		action.payload.then(
			(res) => {
				const currentState = store.getState();
				if (!skipTracking && currentState.viewChangeCounter !== currentView) {
					return;
				}
				console.log("RESULT", res);
				action.payload = res;
				store.dispatch({ type: ASYNC_END, promise: action.payload });
				store.dispatch(action);
			},
			(error) => {
				const currentState = store.getState();
				if (!skipTracking && currentState.viewChangeCounter !== currentView) {
					return;
				}
				console.log("ERROR", error);
				action.error = true;

				if (!error.response) {
					action.payload = {
						errors: 'Failed to connect to the API server.',
					};
				} else {
					action.payload = error.response?.body;
				}

				if (!action.skipTracking) {
					store.dispatch({ type: ASYNC_END, promise: action.payload });
				}
				store.dispatch(action);
			}
		);

		return;
	}

	next(action);
};

function isPromise(v) {
	return v && typeof v.then === "function";
}

export { promiseMiddleware };
