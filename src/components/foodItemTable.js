import React from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

const tableData = [
	{
		name: 'Pizza',
	},
	{
		name: 'Milk',
	},
	{
		name: 'Steak',
	},
	{
		name: 'Chicken',
	},
	{
		name: 'Green Beans',
	},
	{
		name: 'Yogurt',
	},
];

class FoodItemTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			toggled: true,
			showCheckboxes: false,
		};
	}

	handleToggle = (event, toggled) => {
		this.setState({ [event.target.name]: toggled });
	};

	handleChange = (event) => {
		this.setState({ height: event.target.value });
	};

	render() {
		return (
			<Table>
				<TableBody
					displayRowCheckbox={this.state.showCheckboxes}
    >
			{tableData.map((row, index) => (
				<TableRow key={index}>
					<TableRowColumn>{index + 1}</TableRowColumn>
					<TableRowColumn>{row.name}</TableRowColumn>
					<Toggle
						onToggle={this.handleToggle}
						defaultToggled={this.state.toggled}
     />
				</TableRow>
			))}
				</TableBody>
			</Table>
		);
	}
}

export default FoodItemTable;
