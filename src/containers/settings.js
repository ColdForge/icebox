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
import Remove from 'material-ui/svg-icons/content/backspace';
import Fridge from 'material-ui/svg-icons/places/kitchen';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Message from 'material-ui/svg-icons/communication/message';
import Dinner from 'material-ui/svg-icons/maps/local-dining';
import SettingsConfirm from '../components/settingsConfirm';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import PhotoUploader from '../components/photoUploader';
import classNames from 'classnames';

const styles = {
	photo: {
		height: 150,
		width: 150,
	},
	alert: {
		width: 300
	},
	houseItem: {
		display: 'inline-block',
	},
};

class Settings extends Component {

	constructor(props){
    super(props);
    this.state = {
    	confirmedStaples: false,
    	alertOpen: false,
    	confirm: null,
    };

    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.updateStaples = this.updateStaples.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.messageToggle = this.messageToggle.bind(this);
  }

	componentWillMount() {
	  this.props.getUserProfile();
	}

	addUser(email) {
    this.props.addUserToIcebox({ email });
    console.log({email: email, status: 'Success'});
	}

	removeUser(user, i) {
		console.log('remove firing', user, i);
		if(user.name === this.props.name){
      this.setState({ confirm: "Can't remove yourself!!!", alertOpen: true });
		} else {
	    console.log('User being removed', user, i);
			this.props.removeUserFromIcebox({ user });
		}
	}

	handleToggle(event, toggled) {
		const bool = this.state.confirmedStaples[event.target.name];
		this.setState({
			confirmedStaples: {
				...this.state.confirmedStaples,
				[event.target.name]: !bool,
			},
		});
		console.log('toggled', this.state.confirmedStaples);
	}

	messageToggle() {
		this.setState({ alertOpen: !this.state.alertOpen });
	}

	updateStaples() {
    console.log('updateStaples is firing', this.state.confirmedStaples);
    this.props.updateUserStaples(this.state.confirmedStaples);
    this.setState({ confirm: "Successfully updated staples", alertOpen: true });
	}

	componentDidUpdate() {
		if(!this.state.confirmedStaples){
  		const stapleObj = {};
  		this.props.staples.forEach(staple => {
      	stapleObj[staple.stapleID] = !!staple.status;
      });
  		this.setState({
  			confirmedStaples: { ...this.state.confirmedStaples, ...stapleObj },
  		});
		}
	}

	render() {
		return (

			<div className="container-fluid">
				<div className="row">

				<div className="settings-box col-md-4">
				<div className="settings-header">
				Profile
				</div>
				<div className="settings-divs">	
					<List>
						<ListItem disabled>
							<img style={styles.photo} className="img-rounded" src={"https://avatars2.githubusercontent.com/u/16884524?v=3&s=460"}/>
						</ListItem>
						<ListItem style={{height: 40}} disabled>
							<h4>Username: {this.props.email}</h4>
						</ListItem>
						<ListItem style={{height: 40}} disabled>
							<h4>Name: {this.props.name} </h4>
						</ListItem>
						<ListItem style={{height: 40}} disabled>
							<PhotoUploader />
						</ListItem>
						<ListItem disabled>
							<div>
								<Dialog
									actions={<FlatButton label="OK" primary={true} onTouchTap={this.messageToggle} />}
									modal={false}
									open={this.state.alertOpen}
									onRequestClose={this.messageToggle}
								>
									<Message />
									<h3>{this.state.confirm}</h3>
								</Dialog>
							</div>
						</ListItem>
					</List>
					</div>
					<div className="setting-footer">
					</div>
					</div>

				<div className="settings-box col-md-4">
				<div className="settings-header">
				  Household Users
				</div>
				<div className="settings-divs">
					<List>
						<Table>
							<TableBody displayRowCheckbox={false} >
								{this.props.household.map((person, i) => (
									<TableRow key={i} >
										<TableRowColumn>
											<Avatar src={"https://avatars2.githubusercontent.com/u/16884524?v=3&s=460"} />
										</TableRowColumn>
										<TableRowColumn>
											<h4>{person.name}</h4>
										</TableRowColumn>
										<TableRowColumn>
											<SettingsConfirm className="houseItem" confirmSubmit={this.removeUser.bind(this, person, i)} />
										</TableRowColumn>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</List>
						<SettingsEntry addUser={this.addUser}/>
					</div>
						<div className="setting-footer"></div>
				</div>

				<div className="settings-box col-md-4">
				<div className="settings-header">
				Staples
				</div>
				<div className="settings-divs">
					<List>
						<Table>
							<TableBody displayRowCheckbox={false} >
								{this.props.staples.map(staple => (
									<TableRow key={staple.id} >
									<TableRowColumn><Dinner /></TableRowColumn>
									<TableRowColumn>{staple.name}</TableRowColumn>
									<TableRowColumn>
										<Toggle defaultToggled={!!staple.status} onToggle={this.handleToggle} name={staple.id} />
									</TableRowColumn>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</List>
					<FlatButton 
						label="Update" 
						primary2 
						backgroundColor={'#F5E5C4'} 
						style={{width: '95%', height: 35}} 
						onClick={this.updateStaples} 
						hoverColor={'#F5E5C4'}
					/>
				</div>
				<div className="setting-footer">
				</div>
				</div>
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
	confirmations: React.PropTypes.string,
};

const mapStateToProps = state => ({
	name: state.profile.name,
	email: state.profile.email,
	household: state.profile.household,
	staples: state.profile.staples,
	confirmations: state.profile.confirmations,
});

export default connect(mapStateToProps, actions)(Settings);



