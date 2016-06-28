import React, { Component } from 'react';
import { Table, TableRow, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import ResolveItemTableEntry from './resolveItemTableEntry';

class ResolveItemTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggled: true,
			showCheckboxes: false,
			items: props.items,
			editedItems: props.items,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleExpirationChange = this.handleExpirationChange.bind(this);
		this.handleFoodGroupChange = this.handleFoodGroupChange.bind(this);
	}

	handleExpirationChange(id, expiration) {
		// console.log('handleExpirationChange called');
		const editedItems = this.state.editedItems.slice().map(item => {
			if (id === item.key) {
				return { ...item, expiration };
			}
			return item;
		});
		this.setState({
			editedItems,
		}, () => this.props.handleEditing(editedItems));
	}

	handleFoodGroupChange(id, foodGroup) {
		// console.log('handleFoodGroupChange called');
		const editedItems = this.state.editedItems.slice().map(item => {
			if (id === item.key) {
				return { ...item, foodGroup };
			}
			return item;
		});
		this.setState({
			editedItems,
		}, () => this.props.handleEditing(editedItems));
	}

	handleToggle = (event, toggled) => {
		// this.props.discarded(event.target.name);
		// console.log('handleToggle called with event.target.name of : ', event.target.name);
		// console.log('handleToggle called with event.target.id of : ', event.target.id);
		// console.log('handleToggle called with toggled of : ', toggled);
		const editedItems = this.state.editedItems.slice().map(item => {
			if (event.target.id === item.key) {
				return { ...item, add: toggled };
			}
			return item;
		});
		this.setState({
			editedItems,
		}, () => this.props.handleEditing(editedItems));
		this.setState({ [event.target.name]: toggled });
	};

	handleChange = (event) => {
		this.setState({ height: event.target.value });
	};

	render() {
		// console.log('this.props.items passed into ResolveItemTable are : ', this.props.items);
		return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Food Group</TableHeaderColumn>
						<TableHeaderColumn>Expiration</TableHeaderColumn>
						<TableHeaderColumn>Add Item?</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={this.state.showCheckboxes}
				>
					{this.props.items.map((row, index) => (
						<ResolveItemTableEntry
							key={row.key}
							id={row.key}
							name={row.name}
							foodGroup={row.foodGroup}
							handleFoodGroupChange={this.handleFoodGroupChange}
							expiration={row.expiration}
							handleExpirationChange={this.handleExpirationChange}
							i={index}
							toggle={this.handleToggle}
							toggled={this.state.toggled}
						/>
					))}
				</TableBody>
			</Table>
		);
	}
}

ResolveItemTable.propTypes = {
	discarded: React.PropTypes.func,
	handleEditing: React.PropTypes.func,
	items: React.PropTypes.array,
};

export default ResolveItemTable;
