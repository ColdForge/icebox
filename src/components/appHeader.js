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
			<AppBar
				title="Icebox"
				children={this.renderButtons()}
			/>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(AppHeader);