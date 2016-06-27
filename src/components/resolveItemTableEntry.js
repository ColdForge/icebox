import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
/* eslint-disable */
const ResolveItemTableEntry = ({ name, foodGroup, expiration, toggle, toggled, handleFoodGroupChange, handleExpirationChange }) => (
/* eslint-enable */
	<TableRow>
		<TableRowColumn>{name}</TableRowColumn>
		<TableRowColumn>
			{foodGroup ||
				<TextField
					hintText="Please enter the food group"
					onChange={handleFoodGroupChange}
				/>
			}
		</TableRowColumn>
		<TableRowColumn>
			{expiration ||
				<TextField
					hintText="Please enter the expiration date"
					onChange={handleExpirationChange}
				/>
			}
		</TableRowColumn>
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
	handleExpirationChange: React.PropTypes.func.isRequired,
	handleFoodGroupChange: React.PropTypes.func.isRequired,
};

export default ResolveItemTableEntry;
