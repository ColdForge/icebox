import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeSuggestionList from '../containers/recipeSuggestionList';
import RecipeList from '../containers/recipeList';

const styles = {
	tabs: {
		backgroundColor: 'rgba(0,0,0,0)',
	},
};

const Recipes = ({ children }) => {
	console.log('children passed into recipes is : ', children);
	const index = children.props.location.pathname === '/recipes' ? 0 : 1;
	return (
		<div className="recipes-container">
			<Tabs
				style={styles.tabs}
				className="recipes-tabs"
				initialSelectedIndex={index}
			>
				<Tab
					label="Recipe Suggestions"
					className="recipes-tab"
				>
					<div>
						<RecipeSuggestionList />
					</div>
				</Tab>
				<Tab
					label="Past Recipes"
					className="recipes-tab"
				>
					<div>
						<RecipeList />
					</div>
				</Tab>
			</Tabs>
		</div>
	);
};

Recipes.propTypes = {
	children: React.PropTypes.element,
};

export default Recipes;

/*
<Tab
	label="Recipe Suggestions"
	className="recipes-tab"
>
	<div>
		<RecipeSuggestionList />
	</div>
</Tab>
<Tab
	label="Past Recipes"
	className="recipes-tab"
>
	<div>
		<RecipeList />
	</div>
</Tab>
*/
