import React from 'react';
// import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeToolbar from './recipeToolbar';
// import RecipeSuggestionList from '../containers/recipeSuggestionList';
// import RecipeList from '../containers/recipeList';

// const styles = {
// 	tabs: {
// 		backgroundColor: 'rgba(0,0,0,0)',
// 	},
// };

const Recipes = ({ children }) => {
	console.log('children passed into recipes is : ', children);
	// const index = children.props.location.pathname === '/recipes' ? 0 : 1;
	return (
		<div className="recipes-container">
			<RecipeToolbar />
			{children}
		</div>
	);
};

Recipes.propTypes = {
	children: React.PropTypes.element,
};

export default Recipes;

/*
<Tabs
	// style={styles.tabs}
	style={{backgoundColor: 'white'}}
	className="recipes-tabs"
	// tabItemContainerStyle={{backgoundColor: 'white'}}
	initialSelectedIndex={index}
>
	<Tab
		label="Recipe Suggestions"
		className="recipes-tab"
		style={{backgoundColor: 'white'}}
	>
		<div>
			<RecipeSuggestionList />
		</div>
	</Tab>
	<Tab
		label="Past Recipes"
		className="recipes-tab"
		style={{backgoundColor: 'white'}}
	>
		<div>
			<RecipeList />
		</div>
	</Tab>
</Tabs>
*/

