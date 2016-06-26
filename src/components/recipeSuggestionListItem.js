import React from 'react';
import { Card, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	image: {
		display: 'block',
		maxWidth: '200px',
		maxHeight: '200px',
		width: 'auto',
		height: 'auto',
	},
};

const RecipeSuggestionListItem = ({ recipe, chooseRecipe, getRecipeDetails, recipeLocation }) => (
	<Card onExpandChange={getRecipeDetails}>
		<CardHeader
			title={recipe.title}
			subtitle={`Missing Ingredients: ${recipe.missedIngredientCount}  Used Ingredients: ${recipe.usedIngredientCount}`}
			avatar={recipe.image}
			actAsExpander
			showExpandableButton
		/>
		<CardText expandable>
			<CardMedia style={styles.image}>
				<img src={recipe.image} role="presentation" />
			</CardMedia>
		</CardText>
		<CardActions expandable>
			<FlatButton label="Choose this recipe!" onTouchTap={chooseRecipe} />
			<a href={recipeLocation} target="_blank">
				<FlatButton label="Show recipe details" />
			</a>
		</CardActions>
	</Card>
);

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
	getRecipeDetails: React.PropTypes.func,
	recipeLocation: React.PropTypes.string,
};

export default RecipeSuggestionListItem;
