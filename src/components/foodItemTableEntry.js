import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

const FoodItemTableEntry = ({ name, i, toggle, toggled }) => (
	<TableRow key={i}>
		<TableRowColumn>{i + 1}</TableRowColumn>
		<TableRowColumn>{name}</TableRowColumn>
		<Toggle
			name={name}
			onToggle={toggle}
			defaultToggled={toggled}
		/>
	</TableRow>
);

FoodItemTableEntry.propTypes = {
	name: React.PropTypes.string.isRequired,
	i: React.PropTypes.number.isRequired,
	toggle: React.PropTypes.func.isRequired,
	toggled: React.PropTypes.bool,
};

export default FoodItemTableEntry;
