import { GET_USER_PROFILE } from '../constants/actions';

const INITIAL_STATE = {
	name: null,
	email: null,
	household: [],
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case GET_USER_PROFILE:
		return {
			...state,
			name: action.payload.profile.name,
			email: action.payload.profile.email,
			household: [...state.household, ...action.payload.household],
		};
	default:
		return state;
	}
}
