import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
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
					iconElementLeft={
						<IconButton 
							className="appheader-menu-button"
							children={
								<SvgIcon>
									<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
								</SvgIcon>
							}
							onClick={() => this.handleToggle()} 
						/>

					}
					children={this.renderButtons()}
				/>
				<div style={{height: 1000}}>
				<AppDrawer
					className="app-drawer-component" 
					drawerOpen={this.state.drawerOpen}
					updateDrawer={this.handleToggle.bind(this)}
				/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(AppHeader);