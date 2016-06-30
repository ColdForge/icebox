import React from 'react';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ICONS from '../styles/icons';
import SvgIcon from 'material-ui/SvgIcon';
// import IconButton from 'material-ui/IconButton';

import AccountBox from 'material-ui/svg-icons/action/account-box';
import Favorite from 'material-ui/svg-icons/action/favorite';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Calendar from 'material-ui/svg-icons/action/today';
import Help from 'material-ui/svg-icons/action/help';

const styles = {
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	profileTile: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		padding: 25,
	},
	profileImg: {
		width: '100%',
		borderRadius: 100,
		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
	},
	tile1: {
		// flex: 1,
		width: '100%',
		backgroundColor: '#F1F1F1',
	},
	tile2: {
		// flex: 1,
		width: '100%',
		backgroundColor: '#F1F1F1',
	},
	tile3: {
		// flex: 1,
		width: '100%',
		backgroundColor: '#F1F1F1',
	},
	tile4: {
		position: 'fixed',
		bottom: 0,
		left: 110,
	},
	button: {
		// position: 'relative',
		// top: 30,
		color: '#556270',
		backgroundColor: '#FFFFFF',
		fontSize: '2em',
		height: '50%',
		width: '100%',
		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
	},
	icon: {
		opacity: 0.75,
	},
};

const AppDrawer = ({ drawerOpen, updateDrawer }) => (
	<Drawer
		className="app-drawer"
		overlayClassName="app-drawer-overlay"
		docked={false}
		width={250}
		open={drawerOpen}
		onRequestChange={() => updateDrawer()}
	>
		<div style={styles.profileTile}>
			<img
				style={styles.profileImg}
				alt="Profile"
				src={'https://avatars2.githubusercontent.com/u/16884524?v=3&s=460'}
			/>
		</div>
		<List>
			<ListItem
				className="app-drawer-settings"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/settings');
				}}
				primaryText="Settings"
				leftIcon={<AccountBox />}
			/>
			<ListItem
				className="app-drawer-icebox"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/icebox');
				}}
				primaryText="Icebox"
				leftIcon={
					<SvgIcon className="icon">
						<path d={ICONS.Icebox.d} />
					</SvgIcon>
				}
			/>
			<ListItem
				className="app-drawer-recipes"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/recipes');
				}}
				primaryText="Recipes"
				leftIcon={
					<SvgIcon className="icon">
						<path d={ICONS.Recipes.d} />
					</SvgIcon>
				}
			/>
			<ListItem
				className="app-drawer-pastrecipes"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/pastrecipes');
				}}
				primaryText="Past Recipes"
				leftIcon={<Favorite />}
			/>
			<ListItem
				className="app-drawer-calendar"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/recipes');
				}}
				primaryText="Calendar View"
				leftIcon={<Calendar />}
			/>
			<ListItem
				className="app-drawer-shopping-list"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/recipes');
				}}
				primaryText="Shopping List"
				leftIcon={<ShoppingCart />}
			/>
			<ListItem
				className="app-drawer-help"
				onTouchTap={() => {
					updateDrawer();
					browserHistory.push('/');
				}}
				primaryText="Help"
				leftIcon={<Help />}
			/>
		</List>

	</Drawer>
);

AppDrawer.propTypes = {
	drawerOpen: React.PropTypes.bool.isRequired,
	updateDrawer: React.PropTypes.func.isRequired,
};

export default AppDrawer;

/*
<div style={styles.container}>
	<div style={styles.profileTile}>
		<img
			style={styles.profileImg}
			alt="Profile"
			src={'https://avatars2.githubusercontent.com/u/16884524?v=3&s=460'}
		/>
	</div>
	<Link to="/icebox" style={styles.tile1}>
		<IconButton
			style={styles.button}
			className="app-drawer-icebox"
			onTouchTap={() => updateDrawer()}
			iconStyle={styles.icon}
		>
			<SvgIcon className="icon">
				<path d={ICONS.Icebox.d} />
			</SvgIcon>
			Icebox
		</IconButton>
	</Link>
	<Link to="/recipes" style={styles.tile2}>
		<IconButton
			style={styles.button}
			className="app-drawer-recipes"
			onTouchTap={() => updateDrawer()}
			iconStyle={styles.icon}
		>
			<SvgIcon className="icon">
				<path d={ICONS.Recipes.d} />
			</SvgIcon>
			Recipes
		</IconButton>
	</Link>
	<Link to="/settings" style={styles.tile3}>
		<IconButton
			style={styles.button}
			className="app-drawer-settings"
			onTouchTap={() => updateDrawer()}
			iconStyle={styles.icon}
		>
			<SvgIcon className="icon">
				<path d={ICONS.Settings.d} />
			</SvgIcon>
			Settings
		</IconButton>
	</Link>
	<div style={styles.tile4}>
		<p>Help</p>
	</div>
</div>
*/

