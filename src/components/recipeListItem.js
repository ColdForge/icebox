import React from 'react';
import { GridTile } from 'material-ui/GridList';

const RecipeListItem = ({ recipe }) => (
	<GridTile
		title={recipe.title}
		className="recipe-tile"
		subtitle={`Prep Time: ${recipe.readyInMinutes}min, Recipe ID: ${recipe.recipeID}`}
		containerElement={<a href={recipe.sourceUrl} target="_blank"></a>}
	>
		<img
			src={recipe.image}
			role="presentation"
			className="recipe-tile-image"
		/>
	</GridTile>
);

RecipeListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	// title: React.PropTypes.string.isRequired,
	// imageUrl: React.PropTypes.string.isRequired,
	// sourceUrl: React.PropTypes.string.isRequired,
	// recipeID: React.PropTypes.number.isRequired,
	// prepTime: React.PropTypes.number.isRequired,
};

export default RecipeListItem;
