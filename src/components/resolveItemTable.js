import React, { Component } from 'react';
import { Table, TableRow, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import ResolveItemTableEntry from './resolveItemTableEntry';

class ResolveItemTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggled: true,
			showCheckboxes: false,
		};
	}

	handleToggle = (event, toggled) => {
		this.props.discarded(event.target.name);
		this.setState({ [event.target.name]: toggled });
	};

	handleChange = (event) => {
		this.setState({ height: event.target.value });
	};

	render() {
		console.log('this.props.items passed into ResolveItemTable are : ',this.props.items);
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
							key={index}
							name={row.name}
							foodGroup={row.foodGroup}
							expiration={row.expiration}
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
	items: React.PropTypes.array,
};

export default ResolveItemTable;
