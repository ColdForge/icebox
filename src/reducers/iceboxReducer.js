import {
	POPULATE_ICEBOX,
	ADD_ITEMS,
	ADD_TO_TRASH,
	REMOVE_FROM_TRASH,
	REMOVE_ITEMS,
	CLARIFY_ITEMS,
	CLEAR_ICEBOX,
} from '../constants/actions';
import { v4 } from 'node-uuid';
import _remove from 'lodash/remove';

const applyFoodGroupIcon = (item) => {
	switch (item.foodGroup.toLowerCase()) {
	case 'fruit':
		return ({ ...item, iconPath: '../../assets/fruit.png' });
	case 'vegetables':
		return ({ ...item, iconPath: '../../assets/vegetables.png' });
	case 'dairy':
		return ({ ...item, iconPath: '../../assets/dairy.png' });
	case 'meats':
		return ({ ...item, iconPath: '../../assets/meats.png' });
	case 'poultry':
		return ({ ...item, iconPath: '../../assets/poultry.png' });
	case 'pork':
		return ({ ...item, iconPath: '../../assets/pork.png' });
	case 'beef':
		return ({ ...item, iconPath: '../../assets/beef.png' });
	case 'seafood':
		return ({ ...item, iconPath: '../../assets/seafood.png' });
	case 'grains':
		return ({ ...item, iconPath: '../../assets/grains.png' });
	case 'sauces':
		return ({ ...item, iconPath: '../../assets/sauces.png' });
	case 'legumes':
		return ({ ...item, iconPath: '../../assets/legumes.png' });
	case 'sweets':
		return ({ ...item, iconPath: '../../assets/sweets.png' });
	case 'snacks':
		return ({ ...item, iconPath: '../../assets/snacks.png' });
	case 'oils':
		return ({ ...item, iconPath: '../../assets/oils.png' });
	case 'beverages':
		return ({ ...item, iconPath: '../../assets/beverages.png' });
	case 'lamb':
		return ({ ...item, iconPath: '../../assets/lamb.png' });
	case 'nuts':
		return ({ ...item, iconPath: '../../assets/nuts.png' });
	case 'sides':
		return ({ ...item, iconPath: '../../assets/sides.png' });
	default:
		return ({ ...item, iconPath: '../../assets/snacks.png' });
	}
};

const INITIAL_STATE = {
	contents: [],
	noExpirationItems: [],
	noFoodGroupItems: [],
	trashContents: [],
};

export default function (state = INITIAL_STATE, action) {
	let newItems;
	switch (action.type) {
	case POPULATE_ICEBOX:
		newItems = action.payload.map(item => ({ ...applyFoodGroupIcon(item), key: v4() }));
		return { ...state, contents: [...state.contents, ...newItems] };
	case ADD_ITEMS:
		newItems = action.payload.map(item => ({ ...applyFoodGroupIcon(item), key: v4() }));
		return { ...state, contents: [...state.contents, ...newItems] };
	case CLARIFY_ITEMS:
		return {
			...state,
			noExpirationItems: [...state.noExpirationItems, action.noExpirationItems],
			noFoodGroupItems: [...state.noFoodGroupItems, action.noFoodGroupItems],
		};
	case ADD_TO_TRASH: {
		const contentsAfterAdd = state.contents.slice();
		const trashAfterAdd = _remove(contentsAfterAdd, item => (item.itemID === action.payload));
		console.log('inside ADD_TO_TRASH in iceboxReducer, action.payload is : ', action.payload);
		console.log('trashAfterAdd is : ', trashAfterAdd);
		return {
			...state,
			trashContents: [...state.trashContents, ...trashAfterAdd],
		}; }
	case REMOVE_FROM_TRASH: {
		const trashAfterRemove = state.trashContents.slice();
		_remove(trashAfterRemove, item => (item.itemID === action.payload));
		console.log('inside REMOVE_FROM_TRASH in iceboxReducer, action.payload is : ', action.payload);
		console.log('trashAfterRemove is : ', trashAfterRemove);
		return {
			...state,
			trashContents: trashAfterRemove,
		}; }
	case REMOVE_ITEMS: {
		const contentsAfterRemoval = state.contents.slice();
		console.log('state.contents.length is : ', state.contents.length);
		_remove(contentsAfterRemoval, item => (action.payload[item.itemID] === true));
		console.log('contentsAfterRemoval.length is : ', contentsAfterRemoval.length);
		return {
			...state,
			contents: contentsAfterRemoval,
			trashContents: [],
		}; }
	case CLEAR_ICEBOX:
		return { contents: [], noExpirationItems: [], noFoodGroupItems: [], trashContents: [] };
	default:
		return state;
	}
}

