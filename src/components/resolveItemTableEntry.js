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

		const minDate = new Date();
		minDate.setHours(0, 0, 0, 0);

		this.state = {
			foodGroup: null,
			expiration: null,
			minDate,
		};

		this.handleSelect = this.handleSelect.bind(this);
		this.handleDatePick = this.handleDatePick.bind(this);
	}

	handleSelect(event, index, value) {
		this.setState({
			foodGroup: value,
		});
		this.props.handleFoodGroupChange(this.props.id, value);
	}

	handleDatePick(event, date) {
		this.setState({
			expiration: date,
		});
		const days = (Date.parse(date) - Date.parse(this.state.minDate)) / (1000 * 60 * 60 * 24);
		// console.log('days is : ', days);
		this.props.handleExpirationChange(this.props.id, days);
	}

	render() {
		return (
			<TableRow>
				<TableRowColumn>{this.props.name}</TableRowColumn>
				<TableRowColumn>
					{(this.props.foodGroup !== 'N/A') ? this.props.foodGroup :
						<SelectField
							hintText="Please enter the food group"
							errorText={!this.state.foodGroup && 'Please choose the food group!'}
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
							errorText={!this.state.expiration && 'Please pick a date!'}
							value={this.state.expiration}
							onChange={this.handleDatePick}
							minDate={this.state.minDate}
							autoOk
							mode={'landscape'}
						/>
					}
				</TableRowColumn>
				<Toggle
					name={this.props.name}
					id={this.props.id}
					onToggle={this.props.toggle}
					defaultToggled={this.props.toggled}
				/>
			</TableRow>
		);
	}
}

ResolveItemTableEntry.propTypes = {
	id: React.PropTypes.string.isRequired,
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
