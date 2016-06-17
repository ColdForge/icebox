import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

// const grammar = [
// 	'#JSGF V1.0; grammar foods;',
// 	' public <food> = milk | eggs |',
// 	' bread | tomatoes | potatoes |',
// 	' lettuce | kale | bananas | apples |',
// 	' oranges | turkey breast ;',
// ].join(',');

class FoodItemInput extends Component {
	constructor(props) {
		super(props);
		// console.log('props: ', props);
		this.state = { 
			open: false 
		};
	}

	handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
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
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }

}



export default FoodItemInput;
