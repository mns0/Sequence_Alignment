import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

// const composeEnhancers = composeWithDevTools({
// 	trace: true,
// 	traceLimit: 25,
// });

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);

let currentState = store.getState();

// Keeps store consistant with previous state
store.subscribe(() => {
	let previousState = currentState;
	currentState = store.getState();
	if (previousState.auth.token !== currentState.auth.token) {
		const token = currentState.auth.token;
		setAuthToken(token);
	}
});

export default store;
