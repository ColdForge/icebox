import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	profile: {
		width: 300,
		margin: 20,
		display: 'inline-block',
	},
	house: {
		width: 300,
		display: 'inline-block',
	},
	photo: {
		height: 250,
		width: 250,
	},
	button: {
		margin: 12,
	},
  
};


class Settings extends Component {

	render() {
		return (
			<div>
				<div style={styles.profile} className="settings-divs">
					<List>
						<Subheader>Profile</Subheader>
						<img style={styles.photo} src={"https://avatars2.githubusercontent.com/u/16884524?v=3&s=460"}/>
						<RaisedButton label="Change/Add Pic" primary={true} style={styles.button} />
						<ListItem>Username: colin@gmail.com</ListItem>
						<ListItem>Name: Colin Zarnergar</ListItem>
					</List>
				</div>
				<div style={styles.house} className="settings-divs">
					<List>
						<Subheader>Household Users</Subheader>
						<ListItem
						primaryText="Colin Zarnegar"
						leftAvatar={<Avatar src={"https://avatars2.githubusercontent.com/u/16884524?v=3&s=460"} />}
						>
						</ListItem>
						<FlatButton label="Add User" primary={true} />
					</List>
				</div>
			</div>
		);
	}
}

Settings.propTypes = {
	profileInfo: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profileInfo: state.profileInfo,
});

export default connect(mapStateToProps)(Settings);