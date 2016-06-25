import React from 'react';
// import { ListItem } from 'material-ui/List';
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
// import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const styles = {
	gridTile: {
		padding: 10,
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
	Beef: {
		backgroundImage: "url('/../../assets/beef.jpg')",
		backgroundPosition: 'center, center',
	},
	Beverages: {
		backgroundImage: "url('/../../assets/beverages.jpg')",
		backgroundPosition: 'center, center',
	},
	Dairy: {
		backgroundImage: "url('/../../assets/dairy.jpg')",
		backgroundPosition: 'center, center',
	},
	Fruit: {
		backgroundImage: "url('/../../assets/fruit.jpg')",
		backgroundPosition: 'center, center',
	},
	Grains: {
		backgroundImage: "url('/../../assets/grains.jpg')",
		backgroundPosition: 'center, center',
	},
	Lamb: {
		backgroundImage: "url('/../../assets/lamb.jpg')",
		backgroundPosition: 'center, center',
	},
	Legumes: {
		backgroundImage: "url('/../../assets/legumes.jpg')",
		backgroundPosition: 'center, center',
	},
	Meats: {
		backgroundImage: "url('/../../assets/meats.jpg')",
		backgroundPosition: 'center, center',
	},
	Nuts: {
		backgroundImage: "url('/../../assets/nuts.jpg')",
		backgroundPosition: 'center, center',
	},
	Pork: {
		backgroundImage: "url('/../../assets/pork.jpg')",
		backgroundPosition: 'center, center',
	},
	Poultry: {
		backgroundImage: "url('/../../assets/poultry.jpg')",
		backgroundPosition: 'center, center',
	},
	Sauces: {
		backgroundImage: "url('/../../assets/sauces.jpg')",
		backgroundPosition: 'center, center',
	},
	Seafood: {
		backgroundImage: "url('/../../assets/seafood.jpg')",
		backgroundPosition: 'center, center',
	},
	Sweets: {
		backgroundImage: "url('/../../assets/sweets.jpg')",
		backgroundPosition: 'center, center',
	},
	Vegetables: {
		backgroundImage: "url('/../../assets/vegetables.jpg')",
		backgroundPosition: 'center, center',
	},
	cardHeader: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		Image: {
			flex: 1,
		},
		Title: {
			marginLeft: 10,
			flex: 2,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '3em',
			color: 'white',
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

const IceboxListItem = ({ name, foodGroup, expiration }) => {
	if (!name) {
		return <GridTile primaryText="Loading..." />;
	}

	let textColor = 'black';

	if (expiration <= 3) {
		textColor = 'red';
	}
	if (expiration > 3 && expiration <= 6) {
		textColor = 'orange';
	}
	if (expiration >= 7) {
		textColor = 'green';
	}
	// console.log('foodGroup passed into IceboxListItem is : ', foodGroup);
	return (
		<GridTile
			className="iceboxListItem"
			style={{ ...styles.gridTile }}
			children={
				<Paper style={{ ...styles.paper, ...styles[foodGroup], border: `1px solid ${textColor}` }} zDepth={5}>
					<div style={styles.cardBody}>
						<span style={styles.cardHeader.Title}>{foodGroup}</span>
						<span style={styles.cardBody.Title}>{name}</span>
						<span style={styles.cardBody.Subtitle}>
							Expires in <span style={{ color: textColor }}>{expiration} days</span>
						</span>
					</div>
				</Paper>
			}
		/>
	);
};
/*
<div className="list-item-container" data-food-group={foodGroup}>
	<img className="food-group-icon" height="24" width="24" alt="Food Group" src={iconPath} />
	<div className="item-name">
	{name}
	</div>
	<div className={textColor} id="expiration">
	{expiration}
	</div>
</div>
*/
IceboxListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	foodGroup: React.PropTypes.string.isRequired,
	iconPath: React.PropTypes.string.isRequired,
	expiration: React.PropTypes.number.isRequired,
};

export default IceboxListItem;
