import React from 'react';
import { Table, TableBody } from 'material-ui/Table';
import FoodItemTableEntry from './foodItemTableEntry';

// const tableData = [
// 	{
// 		name: 'Pizza',
// 	},
// 	{
// 		name: 'Milk',
// 	},
// 	{
// 		name: 'Steak',
// 	},
// 	{
// 		name: 'Chicken',
// 	},
// 	{
// 		name: 'Green Beans',
// 	},
// 	{
// 		name: 'Yogurt',
// 	},
// ];

class FoodItemTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			toggled: true,
			showCheckboxes: false,
		};
	}

	handleToggle = (event, toggled) => {
		// console.log('Toggled element', event.target.name);
		this.props.discarded(event.target.name);
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
					{this.props.items.map((row, index) => (
						<FoodItemTableEntry
							name={row}
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

FoodItemTable.propTypes = {
	discarded: React.PropTypes.func,
	items: React.PropTypes.array,
};

export default FoodItemTable;
