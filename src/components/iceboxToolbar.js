import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

const styles = {
	button: {
		zIndex: 100
	},
	textField: {
		marginTop: '8px',
		height: '40px',
		width: '200px',
		borderRadius: '10px',
		backgroundColor: '#F5F5F5'
	}
}

class IceboxToolbar extends Component {
	constructor(props){
		super(props);
		this.state = {
			filterValue: "expiration",
			sortDescending: true,
			searchTerm: ''
		}
	}

	handleSearch(event) {
		this.setState({ searchTerm: event.target.value });
	}

	changeSortDirection(){
		this.setState({ sortDescending: !this.state.sortDescending });
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
					<TextField
						value={this.state.searchTerm}
						onChange={event => this.handleSearch(event)}
						style={styles.textField}
					/>
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
					<IconButton
						tooltip="Asc/Desc" 
						style={styles.button}
						className="icebox-toolbar-sort-arrows"
						onClick={() => this.changeSortDirection()}
					>
						<SvgIcon className="icebox-toolbar-svgicon-sort-arrows">
							<path d={ICONS.SortArrows.d} />
						</SvgIcon>
					</IconButton>
					<ToolbarSeparator />
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
	      		onChange={(event,value) => this.handleFilterChange(event,value)}
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