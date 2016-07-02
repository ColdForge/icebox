import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';
// import MinusCheckbox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
// import DeleteAction from 'material-ui/svg-icons/action/delete';

const styles = {
	gridTile: {
		// padding: 10,
	},
	paper: {
		height: '100%',
		width: '100%',
		// width: 100,
		// margin: 20,
		// textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
	},
	cardHeader: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		Title: {
			marginLeft: 10,
			paddingLeft: 10,
			marginRight: 10,
			width: '100%',
			flex: 1,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '2em',
			color: 'white',
			display: 'flex',
			flexDirection: 'row',
			Group: {
				flex: 2,
				textAlign: 'left',
			},
			CheckboxContainer: {
				flex: 1,
				textAlign: 'right',
				paddingRight: 10,
			},
			Checkbox: {
				marginLeft: 0,
				paddingLeft: 0,
				color: 'white',
			},
		},
	},
	cardBody: {
		flex: 1,
		display: 'flex',
		backgroundColor: 'rgba(0,0,0,0.6)',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		Title: {
			flex: 2,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '5em',
			color: 'white',
		},
		Subtitle: {
			flex: 2,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '3em',
			color: 'white',
		},
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
		console.log('handleChange in iceboxListItem fired, this.state.checked is : ', this.state.checked);
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
						className={classNames("icebox-item-container",`${this.props.foodGroup}`,`${this.state.borderColor}`)}
						zDepth={5}
					>
						<div className="icebox-item-card">
							<div className="icebox-item-card-title">
								<span
									className="icebox-item-food-group"
									id="icebox-item-food-group"
									data-food-group={this.props.foodGroup}
								>
									{this.props.foodGroup}
								</span>
								<span className="icebox-item-remove-container">
									<Checkbox
										iconStyle={{ marginLeft: 0, height: 40, width: 40, stroke: 'white', fill: 'red', paddingRight: 10 }}
										label="Remove"
										labelStyle={{ color: 'red', fontSize: 12, margin: 0, padding: 0 }}
										labelPosition="left"
										checked={this.state.checked}
										onCheck={this.handleChange}
										style={styles.cardHeader.Title.Checkbox}
									/>
								</span>
							</div>
							<span className="icebox-item-name" id="icebox-item-name">{this.props.name}</span>
							<span className="icebox-item-info">
								<p>Expires in</p>
								<p>
									<span
										id="icebox-item-expiration"
										className={classNames(`${this.state.textColor}`)}
									>
										{this.props.expiration}
									</span>
								</p>
								<p>days</p>
							</span>
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
