import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import AppDrawer from './appDrawer';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class AppHeader extends Component {
	constructor(props){
		super(props);
		this.state = {
			drawerOpen: false
		}
	}
	// Methods for handling AppDrawer behavior
	handleToggle(){this.setState({drawerOpen: !this.state.drawerOpen})};

	renderButtons(){
		// if a user is currently authenticated
		if(this.props.auth){
			// render the help and signout buttons
			return (
				<div>
					<FlatButton className='help-button' label="Help" />
					<FlatButton className='signout-button' label="Signout" />
				</div>
			);
		} else { // else
			// render the signup and signin buttons
			return (
				<div>
					<FlatButton className='signup-button' label="Signup" />
					<FlatButton className='signin-button' label="Signin" />
				</div>
			);
		}
	}
	render(){
		return (
			<div>
				<AppBar
					title="Icebox"
					iconClassNameLeft="appheader-menu-button"
					onLeftIconButtonTouchTap={() => this.handleToggle()}
					children={this.renderButtons()}
				/>
				<AppDrawer
					className="app-drawer-component" 
					drawerOpen={this.state.drawerOpen}
					updateDrawer={this.handleToggle.bind(this)}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(AppHeader);