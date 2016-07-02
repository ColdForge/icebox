import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// import RecipeToolbar from './recipeToolbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RecipeSuggestionList from '../containers/recipeSuggestionList';
import RecipeList from '../containers/recipeList';

const theme = {
	fontFamily: 'Roboto, sans-serif',
	palette: {
		textColor: '#D48548',
		alternateTextColor: '#D48548',
		primary1Color: '#F5E5C4',
		primary2Color: '#F5E5C4',
		primary3Color: '#F5E5C4',
		accent1Color: '#D48548',
		accent2Color: '#FFFFFF',
		accent3Color: '#F5E5C4',
	},
};

class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
		};
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(theme) };
	}

	render() {
		return (
			<div className="recipes-container">
				<Tabs
					// style={styles.tabs}
					// style={{ backgoundColor: 'white'}}
					className="recipes-tabs"
					// contentContainerStyle={{height: '100%'}}
					// tabItemContainerStyle={{ backgoundColor: 'white', height: '100%' }}
				>
					<Tab
						label="Recipe Suggestions"
						className="recipes-tab"
						style={{ backgoundColor: 'white', height: '100%' }}
					>
						<div>
							<RecipeSuggestionList />
						</div>
					</Tab>
					<Tab
						label="Past Recipes"
						className="recipes-tab"
						style={{ backgoundColor: 'white', height: '100%' }}
					>
						<div>
							<RecipeList />
						</div>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

Recipes.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
// Recipes.propTypes = {
// 	children: React.PropTypes.element,
// };

export default Recipes;
