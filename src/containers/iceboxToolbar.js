import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { SORT_EXPIRATION, SORT_FOODGROUP, SORT_FOODNAME, ASCENDING, DESCENDING } from '../constants/sorts';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import ICONS from '../styles/icons';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import FoodItemInput from '../components/foodItemInput';

const styles = {
	button: {
		zIndex: 100
	},
	removeButton: {
		height: 48,
		zIndex: 100,
	},
	buttonPlaceholder: {
		width: 48,
		height: 48,
	},
	textField: {
		marginTop: '12px',
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
		backgroundColor: 'rgba(255, 255, 255, 0.0)',
	},
	toolbarGroup1: {
		marginLeft: 24,
		// paddingLeft: 24,
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
		marginRight: 24,
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

		this.state = {
			searchOpen: false,
		};

		this.toggleSearch = this.toggleSearch.bind(this);
		this.submitFoods = this.submitFoods.bind(this);
		this.renderDeleteButton = this.renderDeleteButton.bind(this);
		this.renderSearchBar = this.renderSearchBar.bind(this);
		this.renderClearSearchButton = this.renderClearSearchButton.bind(this);
	}

	toggleSearch(){
		this.setState({
			searchOpen: !this.state.searchOpen
		});
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
					iconStyle={{width: 48, height: 48}}
					style={{width: 64, height: 64, padding: 8}}
					className="icebox-toolbar-clear-search"
					onTouchTap={() => this.props.clearIceboxSearch()}
				>
					<SvgIcon
						className="icebox-toolbar-clear-search-svgicon"
						color="white"
						hoverColor="red"
					>
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

	renderSearchBar(){
		return (this.state.searchOpen) ? (
			<TextField
				id="icebox-toolbar-search-field"
				value={this.props.iceboxSearch}
				onChange={event => this.handleSearch(event)}
				style={styles.textField}
				inputStyle={{fontSize:18,color: 'orange', textAlign:'center'}}
				underlineShow={false}
			/>
		) : (
			<div style={{ marginTop: '12px',height: '40px',width: '200px'}} />
		);
	}

	renderDeleteButton(){
		return (this.props.trashContents.length > 0) ? (
			<RaisedButton
				label="Remove Items?"
				secondary={true}
				style={styles.removeButton}
				onTouchTap={() => this.props.removeIceboxItems({ items: this.props.trashContents })}
			/>
		) : (
			<div />
		);
	}

	render() {
		return (
			<Toolbar
				style={styles.toolbar}
				noGutter={true}
				className="icebox-toolbar"
			>
				<ToolbarGroup
					firstChild={true}
					style={styles.toolbarGroup1}
				>
					<IconButton
						tooltip="Search"
						iconStyle={{width: 48, height: 48}}
						style={{width: 64, height: 64, padding: 8}}
						className="icebox-toolbar-search"
						onTouchTap={this.toggleSearch}
					>
						<SvgIcon
							className="icebox-toolbar-svgicon-search"
							color="white"
							hoverColor="orange"
						>
							<path d={ICONS.Search.d} />
						</SvgIcon>
					</IconButton>
					{this.renderSearchBar()}
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
					{this.renderDeleteButton()}
					<IconButton
						tooltip="Asc/Desc"
						iconStyle={{width: 48, height: 48}}
						style={{width: 64, height: 64, padding: 8}}
						className="icebox-toolbar-sort-arrows"
						onClick={() => this.changeSortDirection()}
					>
						<SvgIcon
							className="icebox-toolbar-svgicon-sort-arrows"
							color="white"
							hoverColor={'orange'}
						>
							<path d={ICONS.SortArrows.d} />
						</SvgIcon>
					</IconButton>
					<ToolbarSeparator style={{marginLeft: '12px', marginRight: '12px'}}/>
					<IconMenu
						iconButtonElement={
							<IconButton
								tooltip="Sort"
								iconStyle={{width: 48, height: 48}}
								style={{width: 64, height: 64, padding: 8}}
								className="icebox-toolbar-sort"
							>
								<SvgIcon
									className="icebox-toolbar-svgicon-sort"
									style={styles.svgicon}
									color="white"
									hoverColor={'orange'}
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

const mapStateToProps = state => ({
	sortBy: state.sortBy,
	sortOrder: state.sortOrder,
	iceboxSearch: state.iceboxSearch,
	trashContents: state.icebox.trashContents,
})

export default connect(mapStateToProps, actions)(IceboxToolbar);
