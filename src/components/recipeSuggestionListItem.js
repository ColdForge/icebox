import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const RecipeSuggestionListItem = ({ recipe, chooseRecipe }) => (
	<Card>
		<CardHeader
			title={recipe.title}
			subtitle="Subtitle"
			actAsExpander
			showExpandableButton
		/>
		<CardText expandable>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		</CardText>
		<CardActions expandable>
			<FlatButton label="Choose this recipe!" onTouchTap={chooseRecipe} />
		</CardActions>
	</Card>
);

RecipeSuggestionListItem.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	chooseRecipe: React.PropTypes.func,
};

export default RecipeSuggestionListItem;
