import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeSuggestionList from '../containers/recipeSuggestionList';
import RecipeList from '../containers/recipeList';

const Recipes = () => (
	<div className="recipes-container">
		<Tabs>
			<Tab label="Recipe Suggestions">
				<div>
					<h1>recipe suggestions go here</h1>
					<RecipeSuggestionList />
				</div>
			</Tab>
			<Tab label="Past Recipes">
				<div>
					<h1>Past Recipes</h1>
					<RecipeList />
				</div>
			</Tab>
		</Tabs>
	</div>
);

export default Recipes;
