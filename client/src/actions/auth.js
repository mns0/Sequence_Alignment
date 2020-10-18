import api from '../utils/api';
import { setAlert } from './alert';
import {
	ALIGNMENT_ERROR,
	ALIGNMENT_SUCCESS,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		const res = await api.get('/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register = (formData) => async (dispatch) => {
	try {
		const res = await api.post('/users', formData);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login User
export const login = (email, password) => async (dispatch) => {
	const body = { email, password };

	try {
		const res = await api.post('/auth', body);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout
export const logout = () => ({ type: LOGOUT });

// Run a sequence alignment
export const runAlignment = (inputSequence) => async (dispatch) => {
	const body = {
		alignmentString: inputSequence,
	};
	try {
		const res = await api.post('/users/alignment', body);
		console.log(res.data);
		dispatch({
			type: ALIGNMENT_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: ALIGNMENT_ERROR,
		});
	}
};
