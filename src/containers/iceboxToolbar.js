import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { SORT_EXPIRATION, SORT_FOODGROUP, SORT_FOODNAME, ASCENDING, DESCENDING } from '../constants/sorts';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';
import FoodItemInput from '../components/foodItemInput';

const styles = {
	button: {
		zIndex: 100
	},
	buttonPlaceholder: {
		width: 48,
		height: 48,
	},
	textField: {
		marginTop: '8px',
		height: '40px',
		width: '200px',
		borderRadius: '10px',
		backgroundColor: '#F5F5F5'
	},
	toolbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 72,
		backgroundColor: 'rgba(156, 223, 158, 0.5)',
	},
	toolbarGroup1: {
		marginLeft: '10px',
		width: '33%',
		display: 'flex',
		justifyContent: 'flex-start',
	},
	toolbarGroup2: {
		width: '34%',
		display: 'flex',
		justifyContent: 'center',
	},
	toolbarGroup3: {
		marginRight: '10px',
		width: '33%',
		display: 'flex',
		justifyContent: 'flex-end',
	},
	svgicon: {
		width: 50,
		height: 50,
	}
}

let isOpen = false

class IceboxToolbar extends Component {
	constructor(props){
		super(props);

		this.submitFoods = this.submitFoods.bind(this);
	}

	handleSearch(event) {
		this.props.setIceboxSearch(event.target.value);
	}

	changeSortDirection(){
		this.props.sortOrder === ASCENDING ? this.props.setSortOrder(DESCENDING) : this.props.setSortOrder(ASCENDING);
	}

	handleFilterChange(event, value) {
		this.props.setSortBy(value)
	}

  // trying to call this method, which comes from props
	submitFoods(foodItems) {
		this.props.addIceboxItems({ foodItems });
		console.log('Submit foods is firing', foodItems);
	}

	renderClearSearchButton() {
		if(this.props.iceboxSearch){
			return (
				<IconButton
					tooltip="Clear Search"
					style={styles.button}
					className="icebox-toolbar-clear-search"
					onTouchTap={() => this.props.clearIceboxSearch()}
				>
					<SvgIcon className="icebox-toolbar-clear-search-svgicon">
						<path d={ICONS.ClearSearch.d} />
					</SvgIcon>
				</IconButton>
			);
		} else {
			return (
				<div style={styles.buttonPlaceholder} />
			);
		}
	}


	render() {
		return (
			<Toolbar style={styles.toolbar} noGutter={true}>
				<ToolbarGroup
					firstChild={true}
					style={styles.toolbarGroup1}
				>
					<IconButton
						tooltip="Search"
						iconStyle={{width: '48px', height: '48px'}}
						style={{width: '60px', height: '60px', padding: 0}}
						className="icebox-toolbar-search"
					>
						<SvgIcon className="icebox-toolbar-svgicon-search">
							<path d={ICONS.Search.d} />
						</SvgIcon>
					</IconButton>
					<TextField
						id="icebox-toolbar-search-field"
						value={this.props.iceboxSearch}
						onChange={event => this.handleSearch(event)}
						style={styles.textField}
					/>
					{this.renderClearSearchButton()}
				</ToolbarGroup>
				<ToolbarGroup
					style={styles.toolbarGroup2}
				>
					  <FoodItemInput submitFoods={this.submitFoods}/>

				</ToolbarGroup>
				<ToolbarGroup
					style={styles.toolbarGroup3}
				>
					<IconButton
						tooltip="Asc/Desc"
						iconStyle={{width: '48px', height: '48px'}}
						style={{width: '60px', height: '60px', padding: 0}}
						className="icebox-toolbar-sort-arrows"
						onClick={() => this.changeSortDirection()}
					>
						<SvgIcon
							className="icebox-toolbar-svgicon-sort-arrows"
						>
							<path d={ICONS.SortArrows.d} />
						</SvgIcon>
					</IconButton>
					<ToolbarSeparator style={{marginLeft: '12px', marginRight: '12px'}}/>
					<IconMenu
						iconButtonElement={
							<IconButton
								tooltip="Sort"
								iconStyle={{width: '48px', height: '48px'}}
								style={{width: '60px', height: '60px', padding: 0}}
								className="icebox-toolbar-sort"
							>
								<SvgIcon
									className="icebox-toolbar-svgicon-sort"
									style={styles.svgicon}

								>
									<path d={ICONS.Sort.d} />
								</SvgIcon>
							</IconButton>
						}
						anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	      		targetOrigin={{horizontal: 'right', vertical: 'top'}}
	      		value={this.props.sortBy}
	      		onChange={(event,value) => this.handleFilterChange(event,value)}
					>
						<MenuItem
							value={SORT_EXPIRATION}
							primaryText="Sort By: Expiration"/>
						<MenuItem
							value={SORT_FOODGROUP}
							primaryText="Sort By: Food Group"/>
						<MenuItem
							value={SORT_FOODNAME}
							primaryText="Sort By: Food Name"/>
					</IconMenu>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

function mapStateToProps(state) {
	return { sortBy: state.sortBy, sortOrder: state.sortOrder, iceboxSearch: state.iceboxSearch };
}

export default connect(mapStateToProps, actions)(IceboxToolbar);
