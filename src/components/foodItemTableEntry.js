import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

const FoodItemTableEntry = ({ name, i, toggle }) => {
	return (
		<TableRow key={i}>
			<TableRowColumn>{i + 1}</TableRowColumn>
			<TableRowColumn>{name}</TableRowColumn>
			<Toggle
				onToggle={toggle}
				defaultToggled
			/>
		</TableRow>
	);
};

FoodItemTableEntry.propTypes = {
	name: React.PropTypes.string.isRequired,
	i: React.PropTypes.number.isRequired,
	toggle: React.PropTypes.func.isRequired,
};

export default FoodItemTableEntry;
