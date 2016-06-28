import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
// import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

class ResolveItemTableEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			foodGroup: null,
			expiration: null,
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDatePick = this.handleDatePick.bind(this);
	}

	handleSelect(event, index, value) {
		this.setState({
			foodGroup: value,
		});
		this.props.handleFoodGroupChange();
	}

	handleDatePick(event, date) {
		this.setState({
			expiration: date,
		});
		this.props.handleExpirationChange();
	}

	render() {
		return (
			<TableRow>
				<TableRowColumn>{this.props.name}</TableRowColumn>
				<TableRowColumn>
					{this.props.foodGroup ||
						<SelectField
							hintText="Please enter the food group"
							onChange={this.handleSelect}
							value={this.state.foodGroup}
						>
							<MenuItem value={"Beef"} primaryText="Beef" />
							<MenuItem value={"Beverages"} primaryText="Beverages" />
							<MenuItem value={"Dairy"} primaryText="Dairy" />
							<MenuItem value={"Fruit"} primaryText="Fruit" />
							<MenuItem value={"Grains"} primaryText="Grains" />
							<MenuItem value={"Lamb"} primaryText="Lamb" />
							<MenuItem value={"Legumes"} primaryText="Legumes" />
							<MenuItem value={"Meats"} primaryText="Meats" />
							<MenuItem value={"Nuts"} primaryText="Nuts" />
							<MenuItem value={"Pork"} primaryText="Pork" />
							<MenuItem value={"Poultry"} primaryText="Poultry" />
							<MenuItem value={"Sauces"} primaryText="Sauces" />
							<MenuItem value={"Seafood"} primaryText="Seafood" />
							<MenuItem value={"Sweets"} primaryText="Sweets" />
							<MenuItem value={"Vegetables"} primaryText="Vegetables" />
						</SelectField>
					}
				</TableRowColumn>
				<TableRowColumn>
					{this.props.expiration ||
						<DatePicker
							hintText="Please pick the expiration date"
							value={this.state.expiration}
							onChange={this.handleDatePick}
						/>
					}
				</TableRowColumn>
				<Toggle
					name={this.props.name}
					onToggle={this.props.toggle}
					defaultToggled={this.props.toggled}
				/>
			</TableRow>
		);
	}
}

/* eslint-disable */
// const ResolveItemTableEntry = ({ name, foodGroup, expiration, toggle, toggled, handleFoodGroupChange, handleExpirationChange }) => (
/* eslint-enable */
// 	<TableRow>
// 		<TableRowColumn>{name}</TableRowColumn>
// 		<TableRowColumn>
// 			{foodGroup ||
// 				<SelectField
// 					hintText="Please enter the food group"
// 					onChange={handleFoodGroupChange}
// 				/>
// 			}
// 		</TableRowColumn>
// 		<TableRowColumn>
// 			{expiration ||
// 				<TextField
// 					hintText="Please enter the expiration date"
// 					onChange={handleExpirationChange}
// 				/>
// 			}
// 		</TableRowColumn>
// 		<Toggle
// 			name={name}
// 			onToggle={toggle}
// 			defaultToggled={toggled}
// 		/>
// 	</TableRow>
// );

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
