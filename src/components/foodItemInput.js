import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';
import FoodItemTable from './foodItemTable';

class FoodItemInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			autoScrollBodyContent: true,
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
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
				label="Submit"
				primary
				keyboardFocused
				onTouchTap={this.handleClose}
			/>,
		];

		return (
			<div>
				<IconButton
					tooltip="Speech"
					className="icebox-toolbar-speech"
					label="Dialog"
					onTouchTap={this.handleOpen}
				>
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
				</IconButton>
				<Dialog
					title="Add Food with Voice"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
					<div> Read the names of your foods out loud, as you load them into the refrigerator.</div>
					<div> After each food say "next" like this,</div>
					<div>"Tomatoes..next..Milk..next..Chicken"</div>
					<FoodItemTable />
				</Dialog>
			</div>
		);
	}

}

export default FoodItemInput;
