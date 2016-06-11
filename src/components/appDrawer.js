import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const AppDrawer = ({ drawerOpen, updateDrawer }) => {
  return (
  	<Drawer
  		className="app-drawer"
  		overlayClassName="app-drawer-overlay"
  		docked={false}
  		width={400}
  		open={drawerOpen}
  		onRequestChange={(open) => updateDrawer()}
  	>
  		<MenuItem className="app-drawer-profile" onTouchTap={() => updateDrawer()}>Profile</MenuItem>
  		<MenuItem className="app-drawer-recipes" onTouchTap={() => updateDrawer()}>Recipes</MenuItem>
  	</Drawer>
  );
};

export default AppDrawer;
