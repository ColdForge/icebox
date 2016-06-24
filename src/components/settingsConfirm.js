import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Remove from 'material-ui/svg-icons/content/backspace';

class SettingsConfirm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSubmit = () => {
		this.props.confirmSubmit();
		this.setState({ open: false });
	};

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Remove"
				primary
				onTouchTap={this.handleSubmit}
			/>,
		];

		return (
			<div>
				<FlatButton onTouchTap={this.handleOpen} >
					<Remove />
				</FlatButton>
				<Dialog
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<h3>Are you sure you want to remove this user from your icebox?</h3>
				</Dialog>
			</div>
		);
	}
}

SettingsConfirm.propTypes = {
	user: React.PropTypes.object,
	index: React.PropTypes.number,
	confirmSubmit: React.PropTypes.func,
};

export default SettingsConfirm;
