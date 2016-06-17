import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeList from '../containers/recipeList';

const Recipes = () => (
	<div className="recipes-container">
		<Tabs>
			<Tab label="Recipe Suggestions">
				<div>
					<h1>recipe suggestions go here</h1>
					<RecipeList />
				</div>
			</Tab>
			<Tab label="Past Recipes">
				<div>
					<h1>Past Recipes</h1>
				</div>
			</Tab>
		</Tabs>
	</div>
);

const mapStateToProps = state => ({
	recipes: state.recipes, user: state.user,
});

export default connect(mapStateToProps)(Recipes);
