import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import AppDrawer from './appDrawer';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions/index';
import Message from 'material-ui/svg-icons/social/notifications';
import { green50 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';


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
		color: '#FFFFFF',
		fontSize: 30,
	},
	label: {
		color: '#FFFFFF',
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

	render() {
		// const boundHandleToggle = this.handleToggle.bind(this);
		const pushToHome = () => browserHistory.push('/');
		return (
			<div className="appheader">
				<AppBar
					// title="Icebox"
					className="appheader-navbar"
					titleStyle={{display: 'none'}}
					style={styles.bar}
					// iconElementLeft={
					// 	<IconButton
					// 		className="appheader-menu-button"
					// 		children={
					// 			<SvgIcon>
					// 				<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
					// 			</SvgIcon>
					// 		}
					// 		onClick={this.handleToggle}
					// 	/>
					// }
					// onTitleTouchTap={pushToHome}
					children={
						<div
							className="appheader-children-container"
						>
							<div className="appheader-left-container">
								<div className="appheader-menu-button">
									<IconButton
										children={
											<SvgIcon>
												<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
											</SvgIcon>
										}
										onClick={this.handleToggle}
									/>
								</div>
							</div>
							<div className="appheader-middle-container">
								<h1 onClick={pushToHome}>Icebox</h1>
							</div>
							<div className="appheader-right-container">
								{this.renderButtons()}
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
