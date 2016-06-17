import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const RecipeSuggestionListItem = ({ name, chooseRecipe }) => (
	<Card>
		<CardHeader
			title={name}
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
	name: React.PropTypes.string,
	chooseRecipe: React.PropType.func,
};

export default RecipeSuggestionListItem;
