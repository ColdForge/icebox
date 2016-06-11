import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

const styles = {
	button: {
		zIndex: 100
	}
}

class IceboxToolbar extends Component {
	render() {
		return (
			<Toolbar>
				<ToolbarGroup>
					<IconButton tooltip="Search" style={styles.button}>
						<SvgIcon>
							<path d={ICONS.Search.d} />
						</SvgIcon>
					</IconButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<IconButton tooltip="Speech" style={styles.button}>
						<SvgIcon>
							<path d={ICONS.Speech.d} />
						</SvgIcon>
					</IconButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<IconButton tooltip="Filter" style={styles.button}>
						<SvgIcon>
							<path d={ICONS.Filter.d} />
						</SvgIcon>
					</IconButton>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

export default IceboxToolbar;