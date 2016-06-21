import { POPULATE_ICEBOX, ADD_ITEMS, REMOVE_ITEMS } from '../constants/actions';
import { v4 } from 'node-uuid';

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

export default function (state = [], action) {
	let newItems;
	switch (action.type) {
	case POPULATE_ICEBOX:
		newItems = action.payload.map(item => ({ ...applyFoodGroupIcon(item), key: v4() }));
		return [...state, ...newItems];
	case ADD_ITEMS:
		newItems = action.payload.map(item => ({ ...applyFoodGroupIcon(item), key: v4() }));
		return [...state, ...newItems];
	case REMOVE_ITEMS:
		return state;
	default:
		return state;
	}
}

