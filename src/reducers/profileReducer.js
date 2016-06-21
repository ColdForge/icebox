import { GET_USER_PROFILE } from '../constants/actions';

const INITIAL_STATE = {
	name: null,
	email: null,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case GET_USER_PROFILE:
		return {
			...state,
			name: action.payload.name,
			email: action.payload.email,
		};
	default:
		return state;
	}
}
