import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AppDrawer from './appDrawer';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions/index';
import Message from 'material-ui/svg-icons/social/notifications';
import { green50 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const styles = {
	bar: {
		// backgroundColor: 'rgba(85, 98, 112, 0.5)',
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {

	},
	title: {
		color: '#40593A',
		fontSize: 30,
	},
	label: {
		color: '#40593A',
		fontSize: 18,
	},
};

class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false,
			message: false,
			inviteConfirmed: false,
		};
		this.toggle = () => {
			if (this.props.authenticated) {
				this.setState({ drawerOpen: !this.state.drawerOpen });
			}
		};
		this.handleToggle = this.toggle.bind(this);
		this.toggleMessage = this.toggleMessage.bind(this);
		this.acceptInvite = this.acceptInvite.bind(this);
		this.denyInvite = this.denyInvite.bind(this);
		this.renderMenuButton = this.renderMenuButton.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.invite && !this.state.inviteConfirmed) {
			this.setState({ message: true });
		}
		// console.log('Popup is firing with: ', nextProps.user.invite);
	}

	toggleMessage() {
		this.setState({ message: !this.state.message });
	}

	denyInvite() {
		this.setState({ message: false, inviteConfirmed: true });
	}

	acceptInvite() {
		if (this.props.user.invite) {
			this.props.acceptInvite({ user: this.props.user });
			this.setState({ message: false, inviteConfirmed: true });
		}
	}

	renderButtons() {
		const notifyActions = [
			<FlatButton
				label="No Thanks"
				primary
				onTouchTap={this.denyInvite}
			/>,
			<FlatButton
				label="Accept Invite"
				primary
				keyboardFocused
				onTouchTap={this.acceptInvite}
			/>,
		];

		return this.props.authenticated ? (
			<div style={styles.buttonContainer} className="appheader-right-buttons">
				<div>
					<IconButton className="help-button" onTouchTap={this.toggleMessage}>
						<Message color={green50} />
					</IconButton>
					<Dialog
						title="Icebox Invite"
						actions={notifyActions}
						modal={false}
						open={this.state.message}
						onRequestClose={this.toggleMessage}
					>
						A user has invited you to your icebox {this.props.user.invite}
					</Dialog>
				</div>

				<FlatButton
					className="help-button"
					label="Help"
					labelStyle={styles.label}
				/>
				<FlatButton
					onClick={this.props.signoutUser}
					className="signout-button"
					label="Signout"
					labelStyle={styles.label}
				/>
			</div>
		) : (
			<div style={styles.buttonContainer} className="appheader-right-buttons">
				<Link to="/signup" key={3}>
					<FlatButton
						className="signup-button"
						label="Signup"
						labelStyle={styles.label}
					/>
				</Link>
				<Link to="/signin" key={4}>
					<FlatButton
						className="signin-button"
						label="Signin"
						labelStyle={styles.label}
					/>
				</Link>
			</div>
		);
	}

	renderDrawer() {
		const boundHandleToggle = this.handleToggle.bind(this);

		return this.props.authenticated ? (
			<AppDrawer
				className="app-drawer-component"
				drawerOpen={this.state.drawerOpen}
				updateDrawer={boundHandleToggle}
			/>
		) : (<div></div>);
	}

	renderMenuButton() {
		return this.props.authenticated ? (
			<IconButton
				className="appheader-menu-button"
				iconStyle={{ width: 48, height: 48 }}
				style={{ width: 64, height: 64, padding: 8 }}
				onTouchTap={this.handleToggle}
			>
				<MenuIcon
					className="appheader-menu-button-icon"
					color={'#40593A'}
					hoverColor={'orange'}
				/>
			</IconButton>
		) : (
			<div style={{ width: 64, height: 64 }} />
		);
	}

	render() {
		// const boundHandleToggle = this.handleToggle.bind(this);
		const pushToHome = () => browserHistory.push('/');
		return (
			<div
				className="appheader"
				id="appheader"
				style={{ paddingBottom: 0, marginBottom: 0 }}
			>
				<AppBar
					// title="Icebox"
					className="appheader-navbar"
					titleStyle={{ display: 'none' }}
					style={{ paddingLeft: 0, paddingRight: 0 }}
					children={
						<div
							className="appheader-bar"
						>
							<div
								className="appheader-children-container"
							>
								<div className="appheader-left-container">
									{this.renderMenuButton()}
								</div>
								<div className="appheader-middle-container">
									<h1 onClick={pushToHome}>Icebox</h1>
								</div>
								<div className="appheader-right-container">
									{this.renderButtons()}
								</div>
							</div>
							<div
								className="appheader-color-container"
							>
								<div
									style={{ backgroundColor: '#f5e5c4' }}
									className="appheader-color-bar"
								/>
								<div
									style={{ backgroundColor: '#edb97d' }}
									className="appheader-color-bar"
								/>
								<div
									style={{ backgroundColor: '#d48548' }}
									className="appheader-color-bar"
								/>
								<div
									style={{ backgroundColor: '#40593a' }}
									className="appheader-color-bar"
								/>
								<div
									style={{ backgroundColor: '#769481' }}
									className="appheader-color-bar"
								/>
								<div
									style={{ backgroundColor: '#aec2b7' }}
									className="appheader-color-bar"
								/>
							</div>
						</div>

					}
					showMenuIconButton={false}
				/>
				<div>
				{this.renderDrawer()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
	user: state.user,
});

AppHeader.propTypes = {
	authenticated: React.PropTypes.bool,
	signoutUser: React.PropTypes.func.isRequired,
	user: React.PropTypes.object,
	acceptInvite: React.PropTypes.func,
};

export default connect(mapStateToProps, actions)(AppHeader);
