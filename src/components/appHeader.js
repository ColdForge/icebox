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
		};
	}

	handleToggle() {
		if (this.props.authenticated) {
			this.setState({ drawerOpen: !this.state.drawerOpen });
		}
	}

	renderButtons() {
		return this.props.authenticated ? (
			<div style={styles.buttonContainer}>
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
			<div style={styles.buttonContainer}>
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
		const boundHandleToggle = this.handleToggle.bind(this);
		const pushToHome = () => browserHistory.push('/');
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
							onClick={boundHandleToggle}
						/>

					}
					onTitleTouchTap={pushToHome}
					children={this.renderButtons()}
					showMenuIconButton={this.props.authenticated}
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
});

AppHeader.propTypes = {
	authenticated: React.PropTypes.bool,
	signoutUser: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(AppHeader);
