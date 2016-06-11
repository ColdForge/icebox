import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class AppHeader extends Component {
	renderButtons(){
		// if a user is currently authenticated
		if(this.props.auth){
			// render the help and signout buttons
			return (
				<div>
					<FlatButton label="Help" />
					<FlatButton label="Signout" />
				</div>
			);
		} else { // else
			// render the signup and signin buttons
			return (
				<div>
					<FlatButton label="Signup" />
					<FlatButton label="Signin" />
				</div>
			);
		}
	}
	render(){
		return (
			<AppBar
				title="Icebox"
				children={this.renderButtons()}
			/>
		);
	}
}

export default AppHeader;