import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';
import IconButton from 'material-ui/IconButton';
import SettingsEntry from '../components/settingsEntry';
import Remove from 'material-ui/svg-icons/content/clear';
import Fridge from 'material-ui/svg-icons/places/kitchen';
import Toggle from 'material-ui/Toggle';


const styles = {
	profile: {
		width: 300,
		display: 'inline-block',
		margin: 10,
	},
	house: {
		width: 300,
		display: 'inline-block',
		margin: 10,
	},
	staples: {
		width: 300,
		display: 'inline-block',
		margin: 10,
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

	constructor(props){
    super(props);

    this.addUser = this.addUser.bind(this);
  }

	componentWillMount() {
	  this.props.getUserProfile();
	}

	addUser(email) {
    this.props.addUserToIcebox({ email });
    console.log({email: email, status: 'Success'});
	}

	render() {
		return (
			<div>
				<div style={styles.profile} className="settings-divs">
					<List>
						<Subheader>Profile</Subheader>
						<img style={styles.photo} src={"https://avatars2.githubusercontent.com/u/16884524?v=3&s=460"}/>
						<RaisedButton label="Change/Add Pic" primary={true} style={styles.button} />
						<ListItem>
							Username: {this.props.email}
						</ListItem>
						<ListItem>Name: {this.props.name} </ListItem>
					</List>
				</div>
				<div style={styles.house} className="settings-divs">
					<List>
						<Subheader>Household Users</Subheader>
						{this.props.household.map(person => (
            	<ListItem
            	key={person.name}
							primaryText={person.name}
							leftAvatar={<Avatar src={"https://avatars2.githubusercontent.com/u/16884524?v=3&s=460"} />}
							rightIcon={<Remove />}
							>
							</ListItem>
            ))}
						<SettingsEntry addUser={this.addUser}/>
					</List>
				</div>
				<div style={styles.staples} className="settings-divs">
					<List>
						<Subheader>Staples</Subheader>
							{this.props.staples.map(staple => (
	            	<ListItem
	            	key={staple.name}
								primaryText={staple.name}
								leftAvatar={<Avatar src={"http://images.pier1.com/dis/dw/image/v2/AAID_PRD/on/demandware.static/-/Sites-pier1_master/default/dw3d2c7ea2/images/2824388/2824388_1.jpg?sw=1600&sh=1600"} />}
								rightToggle={<Toggle defaultToggled={false} />}
								>	
								</ListItem>
	            ))}
					</List>
				</div>
			</div>
		);
	}
}

Settings.propTypes = {
	name: React.PropTypes.string,
	email: React.PropTypes.string,
	household: React.PropTypes.array,
	staples: React.PropTypes.array,
};

const mapStateToProps = state => ({
	name: state.profile.name,
	email: state.profile.email,
	household: state.profile.household,
	staples: state.profile.staples,
});

export default connect(mapStateToProps, actions)(Settings);