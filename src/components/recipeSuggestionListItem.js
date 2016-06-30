import React from 'react';
// import { ListItem } from 'material-ui/List';
import { GridTile } from 'material-ui/GridList';
import { Card, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	imageContainer: {
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		height: 300,
		width: '100%',
		// height: '300px',
		// width: '100%',
		// paddingLeft: 10,
		// paddingRight: 10,
	},
	image: {
		// display: 'block',
		height: '100%',
		width: 'auto',
		// maxWidth: '200px',
		// maxHeight: '200px',
		// width: 'auto',
		// height: 'auto',
	},
	cardActions: {
		flex: 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	buttonContainer: {
		height: '100px',
		width: '100%',
		flex: 1,
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: '20px',
	},
	button: {
		margin: 4,
		flex: 1,
		marginRight: 4,
		marginLeft: 4,
		textAlign: 'center',
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

	return (
		<GridTile
			style={{ height: '100%', paddingBottom: 72 }}
			className="recipe-suggestion-list-item"
		>
			<div
				className="recipe-suggestion-list-item-card-bg"
				style={{ height: '100%', backgroundColor: 'rgb(0,0,0)' }}
			>
				<Card
					id="recipe-suggestion-list-item-card"
					className="recipe-suggestion-list-item-card"
					style={applyCardStyle()}
					containerStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
				>
					<CardMedia
						style={{ ...styles.imageContainer, backgroundImage: `url(${recipe.image})` }}
					/>
					<CardTitle title={recipe.title} style={{ flex: 1 }} />
					<CardText style={{ textAlign: 'left', flex: 2 }}>
						<ul style={{ fontSize: 18 }}>
							<li>Ready in {recipe.readyInMinutes} minutes</li>
							<li>{recipe.servings} servings</li>
							<li>Missing Ingredients: {recipe.missedIngredientCount}</li>
							<li>Used Ingredients: {recipe.usedIngredientCount}</li>
						</ul>
					</CardText>
					<CardActions style={styles.cardActions}>
						<div style={styles.buttonContainer}>
							<RaisedButton
								style={styles.button}
								linkButton
								href={recipe.sourceUrl}
								label="Recipe"
								labelStyle={styles.buttonLabel}
								backgroundColor={'#53E3A6'}
							/>
							<RaisedButton
								style={styles.button}
								label="Choose!"
								disabled={!!chosenRecipeID}
								labelStyle={styles.buttonLabel}
								onTouchTap={chooseRecipe}
								backgroundColor={'#53E3A6'}
							/>
						</div>
					</CardActions>
				</Card>
			</div>
		</GridTile>
	);
};

//
// <ListItem
// 	className="recipe-suggestion-list-item"
// >
// 	<Card
// 		onExpandChange={getRecipeDetails}
// 	>
// 		<CardHeader
// 			title={recipe.title}
// 			subtitle={`Missing Ingredients:
//	${recipe.missedIngredientCount}  Used Ingredients: ${recipe.usedIngredientCount}`}
// 			avatar={recipe.image}
// 			actAsExpander
// 			showExpandableButton
// 		/>
// 		<CardText expandable>
// 			<CardMedia style={styles.image}>
// 				<img src={recipe.image} role="presentation" />
// 			</CardMedia>
// 		</CardText>
// 		<CardActions expandable>
// 			<FlatButton label="Choose this recipe!" onTouchTap={chooseRecipe} />
// 			<a href={recipeLocation} target="_blank">
// 				<FlatButton label="Show recipe details" />
// 			</a>
// 		</CardActions>
// 	</Card>
// </ListItem>

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
	chosenRecipeID: React.PropTypes.string,
	getRecipeDetails: React.PropTypes.func,
	recipeLocation: React.PropTypes.string,
};

export default RecipeSuggestionListItem;
