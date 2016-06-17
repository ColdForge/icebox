import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeSuggestionList from '../containers/recipeSuggestionList';

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
				</div>
			</Tab>
		</Tabs>
	</div>
);

const mapStateToProps = state => ({
	recipes: state.recipes, user: state.user,
});

export default connect(mapStateToProps)(Recipes);
