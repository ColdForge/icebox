import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import AppDrawer from './appDrawer';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions/index';

const style = {
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {

	},
	title: {
		color: '#FFFFFF',
		fontSize: 30
	},
	label: {
		color: '#FFFFFF',
		fontSize: 18
	}
}

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
		if(this.props.authenticated){
			// render the help and signout buttons
			return (
				<div style={style.buttonContainer}>
					<FlatButton className='help-button' label="Help" labelStyle={style.label}/>
					<FlatButton className='signout-button' label="Signout" labelStyle={style.label}/>
				</div>
			);
		} else { // else
			// render the signup and signin buttons
			return (
				<div style={style.buttonContainer}>
					<Link to="/signup" key={3}><FlatButton className='signup-button' label="Signup" labelStyle={style.label}/></Link>
					<Link to="/signin" key={4}><FlatButton className='signin-button' label="Signin" labelStyle={style.label}/></Link>
				</div>
			);
		}
	}
	render(){
		return (
			<div>
				<AppBar
					title="Icebox"
					titleStyle={style.title}
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
				<div>
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
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(AppHeader);