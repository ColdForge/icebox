import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class SettingsEntry extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			email: '',
			error: '',
		};
	}

	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleCancel = () => {
		this.setState({ open: false, email: '', error: '' });
	};

	handleSubmit = () => {
		if (!(this.state.email.includes('@'))) {
			this.setState({ error: 'Please include an email address' });
		} else {
			this.setState({ open: false, email: '', error: '' });
			this.props.addUser(this.state.email);
		}
	};

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary
				onTouchTap={this.handleCancel}
			/>,
			<FlatButton
				label="Submit"
				primary
				keyboardFocused
				onTouchTap={this.handleSubmit}
			/>,
		];

		return (
			<div>
				<FlatButton label="Invite User" primary onTouchTap={this.handleOpen} />
				<Dialog
					title="Add a Household User"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<span style={{ color: 'red' }}>{this.state.error}</span>
					<div>
						<TextField
							hintText="Email of Invitee"
							id="invitee-email"
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
					</div>
					Please enter an email address to authorize a user to your icebox
				</Dialog>
			</div>
		);
	}
}

SettingsEntry.propTypes = {
	addUser: React.PropTypes.func,
};

export default SettingsEntry;
