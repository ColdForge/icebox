import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

const ResolveItemTableEntry = ({ name, foodGroup, expiration, toggle, toggled }) => (
	<TableRow>
		<TableRowColumn>{name}</TableRowColumn>
		<TableRowColumn>{foodGroup || "N/A"}</TableRowColumn>
		<TableRowColumn>{expiration || "N/A"}</TableRowColumn>
		<Toggle
			name={name}
			onToggle={toggle}
			defaultToggled={toggled}
		/>
	</TableRow>
);

ResolveItemTableEntry.propTypes = {
	name: React.PropTypes.string.isRequired,
	foodGroup: React.PropTypes.string,
	expiration: React.PropTypes.number,
	i: React.PropTypes.number.isRequired,
	toggle: React.PropTypes.func.isRequired,
	toggled: React.PropTypes.bool,
};

export default ResolveItemTableEntry;
