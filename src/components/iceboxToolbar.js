import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

const styles = {
	button: {
		zIndex: 100
	}
}

class IceboxToolbar extends Component {
	constructor(props){
		super(props);
		this.state = {
			filterValue: "expiration",
			searchTerm: ''
		}
	}

	handleSearch(event, value) {

	}

	handleFilterChange(event, value) {
		this.setState({ filterValue: value });
	}

	render() {
		return (
			<Toolbar>
				<ToolbarGroup>
					<IconButton 
						tooltip="Search" 
						style={styles.button}
						className="icebox-toolbar-search"

					>
						<SvgIcon className="icebox-toolbar-svgicon-search">
							<path d={ICONS.Search.d} />
						</SvgIcon>
					</IconButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<IconButton 
						tooltip="Speech" 
						style={styles.button}
						className="icebox-toolbar-speech"

					>
						<SvgIcon className="icebox-toolbar-svgicon-speech">
							<path d={ICONS.Speech.d} />
						</SvgIcon>
					</IconButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<IconMenu
						iconButtonElement={
							<IconButton 
								tooltip="Sort" 
								style={styles.button}
								className="icebox-toolbar-sort"
							>
								<SvgIcon className="icebox-toolbar-svgicon-sort">
									<path d={ICONS.Sort.d} />
								</SvgIcon>
							</IconButton>
						}
						anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	      		targetOrigin={{horizontal: 'right', vertical: 'top'}}
	      		value={this.state.filterValue}
	      		onChange={this.handleFilterChange}
					>
						<MenuItem 
							value="expiration"
							primaryText="Sort By: Expiration"/>
						<MenuItem
							value="group" 
							primaryText="Sort By: Food Group"/>
						<MenuItem 
							value="name"
							primaryText="Sort By: Food Name"/>
					</IconMenu>

					
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

export default IceboxToolbar;