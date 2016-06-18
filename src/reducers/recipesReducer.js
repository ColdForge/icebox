import { GET_RECIPES, GET_RECIPE_SUGGESTIONS, SET_CHOSEN_RECIPE, CLEAR_CHOSEN_RECIPE } from '../constants/actions';
import { v4 } from 'node-uuid';

const INITIAL_STATE = {
	suggestions: [],
	pastSuggestions: [],
	chosenRecipe: null,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case GET_RECIPES:
		return { ...state, pastSuggestions: [...state.pastSuggestions, ...action.payload] };
	case GET_RECIPE_SUGGESTIONS: {
		const suggestions = action.payload.map(suggestion => ({ ...suggestion, key: v4() }));
		return { ...state, suggestions };
	}
	case SET_CHOSEN_RECIPE:
		return { ...state, chosenRecipe: action.payload };
	case CLEAR_CHOSEN_RECIPE:
		return { ...state, chosenRecipe: null };
	default:
		return state;
	}
}
