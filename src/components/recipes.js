import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeSuggestionList from '../containers/recipeSuggestionList';
import RecipeList from '../containers/recipeList';

const styles = {
	tabs: {
		backgroundColor: 'rgba(0,0,0,0)',
	},
};

const Recipes = () => (
	<div className="recipes-container">
		<Tabs
			style={styles.tabs}
			className="recipes-tabs"
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

export default Recipes;
