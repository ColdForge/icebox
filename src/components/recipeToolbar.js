import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	toolbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 72,
		// backgroundColor: 'rgba(255, 255, 255, 0.0)',
	},
	toolbarGroup1: {
		width: '50%',
		display: 'flex',
		justifyContent: 'center',
	},
	toolbarGroup2: {
		width: '50%',
		display: 'flex',
		justifyContent: 'center',
	},
	svgicon: {
		width: 50,
		height: 50,
	},
};

const RecipeToolbar = () => {
	console.log('inside RecipeToolbar');

	return (
		<Toolbar
			id="recipes-toolbar"
			style={styles.toolbar}
			noGutter
			className="recipes-toolbar"
		>
			<ToolbarGroup
				firstChild
				style={styles.toolbarGroup1}
			>
				<Link to="/recipes" style={{ width: '100%', height: '100%' }}>
					<FlatButton
						label="Recipe Suggestions"
						labelStyle={{ color: 'white', fontSize: 20 }}
						className="recipes-toolbar-button"
					/>
				</Link>
			</ToolbarGroup>
			<ToolbarSeparator style={{ height: '100%', top: 0, marginLeft: '12px', marginRight: '12px' }} />
			<ToolbarGroup
				style={styles.toolbarGroup2}
			>
				<Link to="/pastrecipes" style={{ width: '100%', height: '100%' }}>
					<FlatButton
						label="Past Recipes"
						labelStyle={{ color: 'white', fontSize: 20 }}
						className="recipes-toolbar-button"
					/>
				</Link>
			</ToolbarGroup>
		</Toolbar>
	);
};

export default RecipeToolbar;
