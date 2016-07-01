import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { Card, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	imageContainer: {
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		height: 300,
		width: '100%',
	},
	buttonLabel: {
		fontSize: 18,
		color: 'white',
	},
};

const RecipeSuggestionListItem = ({ recipe, chooseRecipe, chosenRecipeID }) => {
	const applyCardStyle = () => {
		if (chosenRecipeID) {
			if (chosenRecipeID === recipe.id) {
				return { height: '100%' };
			}
			return { height: '100%', opacity: 0.5 };
		}
		return { height: '100%' };
	};

	const cardActions = () => {
		if (chosenRecipeID && recipe.id === chosenRecipeID) {
			return (
				<RaisedButton
					className="recipe-suggestion-card-button"
					linkButton
					href={recipe.sourceUrl}
					target="_blank"
					label="Recipe"
					labelStyle={styles.buttonLabel}
					backgroundColor={'#53E3A6'}
				/>
			);
		}
		return [
			<RaisedButton
				className="recipe-suggestion-card-button"
				linkButton
				href={recipe.sourceUrl}
				target="_blank"
				label="Recipe"
				labelStyle={styles.buttonLabel}
				backgroundColor={'#53E3A6'}
			/>,
			<RaisedButton
				className="recipe-suggestion-card-button"
				label="Choose!"
				disabled={!!chosenRecipeID}
				disabledBackgroundColor={''}
				labelStyle={styles.buttonLabel}
				onTouchTap={chooseRecipe}
				backgroundColor={'#53E3A6'}
			/>,
		];
	};

	return (
		<GridTile
			className="recipe-suggestion-tile"
		>
			<div
				className="recipe-suggestion-card-bg"
			>
				<Card
					id="recipe-suggestion-card"
					className="recipe-suggestion-card"
					style={applyCardStyle()}
				>
					<CardMedia
						style={{ ...styles.imageContainer, backgroundImage: `url(${recipe.image})` }}
					/>
					<CardTitle title={recipe.title} className="recipe-suggestion-card-title" />
					<CardText className="recipe-suggestion-card-text">
						<ul className="recipe-suggestion-card-list">
							<li>Uses {recipe.usedIngredientCount} ingredients</li>
							<li>Missing {recipe.missedIngredientCount} ingredients</li>
							<li>Ready in {recipe.readyInMinutes} minutes</li>
							<li>Makes {recipe.servings} servings</li>
							{recipe.dairyFree && <li>Dairy Free</li>}
							{recipe.glutenFree && <li>Gluten Free</li>}
							{recipe.ketogenic && <li>Ketogenic</li>}
							{recipe.sustainable && <li>Sustainable</li>}
							{recipe.vegan && <li>Vegan</li>}
							{recipe.vegetarian && <li>Vegetarian</li>}
						</ul>
					</CardText>
					<CardActions className="recipe-suggestion-card-actions">
						<div className="recipe-suggestion-card-buttons">
							{cardActions()}
						</div>
					</CardActions>
				</Card>
			</div>
		</GridTile>
	);
};

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
	chosenRecipeID: React.PropTypes.number,
	getRecipeDetails: React.PropTypes.func,
	recipeLocation: React.PropTypes.string,
};

export default RecipeSuggestionListItem;
