import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class AppDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {open: props.drawerOpen};
	}
	
	handleClose = () => {
		this.setState({open: false});
		this.props.updateDrawer();
	}
	
	render(){
		return (
			<Drawer
				className="app-drawer"
				overlayClassName="app-drawer-overlay"
				docked={false}
				width={400}
				open={this.state.open}
				onRequestChange={
					(open) => {
						this.setState({open});
						this.props.updateDrawer();
					}
				}
			>
				<MenuItem className="app-drawer-profile" onTouchTap={this.handleClose}>Profile</MenuItem>
				<MenuItem className="app-drawer-recipes" onTouchTap={this.handleClose}>Recipes</MenuItem>
			</Drawer>
		);
	}
}

export default AppDrawer;