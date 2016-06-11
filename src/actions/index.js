// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as TYPES from '../constants/actions';

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/user/signin`, { email, password })
			// if signin is successful
			.then(response => {
				dispatch({ type: TYPES.AUTHORIZE_USER });
				// -Save the JWT token
				localStorage.setItem('token', response.data.token);
			})
			// else, dispatch authError action creator
			.catch(response => {
				dispatch(authError(response));
			});
	}
}

export function signupUser({ email, name, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/user/signup`, { email, name, password })
			// if signup is successful
			.then(response => {
				dispatch({ type: TYPES.AUTHORIZE_USER });
				// -Save the JWT token
				localStorage.setItem('token', response.data.token);
			})
			// else, dispatch authError action creator
			.catch(response => {
				dispatch(authError(response));
			});
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	return function(dispatch) {
		dispatch({ type: TYPES.DEAUTHORIZE_USER });
	}
}

export function authError(error) {
	return {
		type: TYPES.AUTHORIZE_ERROR,
		payload: error
	}
}
