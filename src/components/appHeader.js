import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import AppDrawer from './appDrawer';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions/index';

const styles = {
	bar: {
		backgroundColor: '#556270',
	},
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
	handleToggle(){
		if(this.props.authenticated){
			console.log('auth true, handleToggle fired');
			this.setState({drawerOpen: !this.state.drawerOpen})			
		}
	};

	renderButtons(){
		// if a user is currently authenticated
		if(this.props.authenticated){
			// render the help and signout buttons
			return (
				<div style={styles.buttonContainer}>
					<FlatButton className='help-button' label="Help" labelStyle={styles.label}/>
					<FlatButton onClick={this.props.signoutUser}className='signout-button' label="Signout" labelStyle={styles.label}/>
				</div>
			);
		} else { // else
			// render the signup and signin buttons
			return (
				<div style={styles.buttonContainer}>
					<Link to="/signup" key={3}><FlatButton className='signup-button' label="Signup" labelStyle={styles.label}/></Link>
					<Link to="/signin" key={4}><FlatButton className='signin-button' label="Signin" labelStyle={styles.label}/></Link>
				</div>
			);
		}
	}

	renderDrawer(){
		if(this.props.authenticated){
			return (
				<AppDrawer
					className="app-drawer-component" 
					drawerOpen={this.state.drawerOpen}
					updateDrawer={this.handleToggle.bind(this)}
				/>
			);
		}
	}
	render(){
		return (
			<div>
				<AppBar
					title="Icebox"
					titleStyle={styles.title}
					style={styles.bar}
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
					onTitleTouchTap={() => browserHistory.push('/')}
					children={this.renderButtons()}
					showMenuIconButton={this.props.authenticated ? true : false}
				/>
				<div>
				{this.renderDrawer()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(AppHeader);