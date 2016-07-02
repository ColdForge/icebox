import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';
import SvgIcon from 'material-ui/SvgIcon';

const styles = {
	paper: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	Beef: {
		backgroundImage: "url('/../../assets/beef.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Beverages: {
		backgroundImage: "url('/../../assets/beverages.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Dairy: {
		backgroundImage: "url('/../../assets/dairy.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Fruit: {
		backgroundImage: "url('/../../assets/fruit.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Grains: {
		backgroundImage: "url('/../../assets/grains.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Lamb: {
		backgroundImage: "url('/../../assets/lamb.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Legumes: {
		backgroundImage: "url('/../../assets/legumes.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Meats: {
		backgroundImage: "url('/../../assets/meats.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Nuts: {
		backgroundImage: "url('/../../assets/nuts.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Pork: {
		backgroundImage: "url('/../../assets/pork.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Poultry: {
		backgroundImage: "url('/../../assets/poultry.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Sauces: {
		backgroundImage: "url('/../../assets/sauces.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Seafood: {
		backgroundImage: "url('/../../assets/seafood.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Sweets: {
		backgroundImage: "url('/../../assets/sweets.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Vegetables: {
		backgroundImage: "url('/../../assets/vegetables.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
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
										checkedIcon={
												/* eslint-disable */
											<SvgIcon style={{stroke:'black',fill:'red'}}>
												<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
											</SvgIcon>
												/* eslint-enable */
										}
										uncheckedIcon={
											<SvgIcon style={{ stroke: 'white', fill: 'none' }}>
												<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
											</SvgIcon>
										}
										checked={this.state.checked}
										onCheck={this.handleChange}
										style={{ position: 'absolute', right: '0px', top: '0px', width: '60px', height: '60px' }}
										iconStyle={{ marginLeft: 0, height: 48, width: 48 }}
									/>
								</div>
							</div>
							<div className="icebox-item-card-body">
								<div className="icebox-item-name-container">
									<p className="icebox-item-name">{this.props.name}</p>
								</div>
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
