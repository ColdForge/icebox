import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class IceboxToolbar extends Component {
	render() {
		return (
			<Toolbar>
				<ToolbarGroup>
					<h4>IceboxToolbar</h4>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

export default IceboxToolbar;