import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';
// import MinusCheckbox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
// import DeleteAction from 'material-ui/svg-icons/action/delete';

const styles = {
	Checkbox: {
		marginLeft: 0,
		paddingLeft: 0,
		color: 'white',
	},
};

class IceboxListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false,
			textColor: 'black',
		};
		this.handleChange = this.handleChange.bind(this);
		this.addToTrash = props.addToTrash;
		this.removeFromTrash = props.removeFromTrash;
	}

	componentWillMount() {
		if (this.props.expiration <= 3) {
			this.setState({
				borderColor: 'Border-Red',
				textColor: 'Expiration-Red',
			});
		}
		if (this.props.expiration > 3 && this.props.expiration <= 6) {
			this.setState({
				borderColor: 'Border-Orange',
				textColor: 'Expiration-Orange',
			});
		}
		if (this.props.expiration >= 7) {
			this.setState({
				borderColor: 'Border-Green',
				textColor: 'Expiration-Green',
			});
		}
	}

	handleChange() {
		if (this.state.checked) {
			this.setState({
				checked: false,
			}, () => this.removeFromTrash({ id: this.props.itemID }));
		} else {
			this.setState({
				checked: true,
			}, () => this.addToTrash({ id: this.props.itemID }));
		}
	}

	render() {
		return (
			<GridTile
				className="icebox-item-tile"
				children={
					<Paper
						className={classNames('icebox-item-container', `${this.props.foodGroup}`, `${this.state.borderColor}`)}
						zDepth={5}
					>
						<div className="icebox-item-card">
							<div className="icebox-item-card-header">
								<p className="icebox-item-food-group" data-food-group={this.props.foodGroup}>
									{this.props.foodGroup}
								</p>
								<div className="icebox-item-remove-container">
									<Checkbox
										iconStyle={{ marginLeft: 0, height: 40, width: 40, stroke: 'white', fill: 'red', paddingRight: 10 }}
										label="Remove"
										labelStyle={{ color: 'red', fontSize: 12, margin: 0, padding: 0 }}
										labelPosition="left"
										checked={this.state.checked}
										onCheck={this.handleChange}
										style={styles.Checkbox}
									/>
								</div>
							</div>
							<div className="icebox-item-card-body">
								<p className="icebox-item-name">{this.props.name}</p>
								<div className="icebox-item-info">
									<p className="icebox-item-expiration-text">Expires in</p>
									<p className={classNames('icebox-item-expiration-date', `${this.state.textColor}`)}>
										{this.props.expiration} days
									</p>
								</div>
							</div>
						</div>
					</Paper>
				}
			/>
		);
	}
}

IceboxListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	foodGroup: React.PropTypes.string.isRequired,
	itemID: React.PropTypes.number,
	expiration: React.PropTypes.number.isRequired,
	addToTrash: React.PropTypes.func,
	removeFromTrash: React.PropTypes.func,
};

export default IceboxListItem;
