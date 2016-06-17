import React from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	profileTile: {
		flex: 2,
	},
	tile1: {
		flex: 1,
		width: '100%',
		backgroundColor: '#C7EDE8',
	},
	tile2: {
		flex: 1,
		width: '100%',
		backgroundColor: '#A7DBD8',
	},
	tile3: {
		flex: 1,
		width: '100%',
		backgroundColor: '#69D2E7',
	},
	button: {
		color: '#556270',
		fontSize: '2em',
		height: '100%',
		width: '100%',
	},
};

const AppDrawer = ({ drawerOpen, updateDrawer }) => (
	<Drawer
		className="app-drawer"
		overlayClassName="app-drawer-overlay"
		docked={false}
		width={400}
		open={drawerOpen}
		onRequestChange={() => updateDrawer()}
	>
		<div style={styles.container}>
			<img
				style={styles.profileTile}
				alt="Profile"
				src={'https://avatars2.githubusercontent.com/u/16884524?v=3&s=460'}
			/>
			<Link to="/icebox" style={styles.tile1}>
				<FlatButton
					style={styles.button}
					className="app-drawer-icebox"
					onTouchTap={() => updateDrawer()}
				>
					Icebox
				</FlatButton>
			</Link>
			<Link to="/recipes" style={styles.tile2}>
				<FlatButton style={styles.button} className="app-drawer-recipes" onTouchTap={() => updateDrawer()}>
					Recipes
				</FlatButton>
			</Link>
			<Link to="/settings" style={styles.tile3}>
				<FlatButton style={styles.button} className="app-drawer-settings" onTouchTap={() => updateDrawer()}>
					Settings
				</FlatButton>
			</Link>
		</div>
	</Drawer>
);

AppDrawer.propTypes = {
	drawerOpen: React.PropTypes.bool.isRequired,
	updateDrawer: React.PropTypes.func.isRequired,
};

export default AppDrawer;
