import { SET_ICEBOX_SEARCH, CLEAR_ICEBOX_SEARCH } from '../constants/actions';

export default function (state = '', action) {
	switch (action.type) {
	case SET_ICEBOX_SEARCH:
		return action.searchTerm;
	case CLEAR_ICEBOX_SEARCH:
		return '';
	default:
		return state;
	}
}
