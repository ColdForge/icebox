import React, { Component } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import PhotoBlock from 'material-ui/svg-icons/action/account-box';
import IconButton from 'material-ui/IconButton';


const styles = {
	button: {
		margin: 12,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	},
	largeIcon: {
		width: 60,
		height: 60,
	},
};


class PhotoUploader extends Component {

	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<div>
				<FlatButton label="Change/Add Pic" primary style={styles.button} onTouchTap={this.handleOpen} />
				<Dialog
					actions={<FlatButton label="DONE" primary onTouchTap={this.handleClose} />}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<IconButton style={styles.large} iconStyle={styles.largeIcon} >
						<PhotoBlock style={styles.photoBlock} />
					</IconButton>
					<h3>Import photo from your drive and then click DONE</h3>
					<ReactS3Uploader
						signingUrl="/s3/sign"
						accept="image/*"
						onProgress={this.onUploadProgress}
						onError={this.onUploadError}
						onFinish={this.onUploadFinish}
						uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
						contentDisposition="auto"
						server="http://localhost:8080"
					/>
				</Dialog>
			</div>
		);
	}
}

export default PhotoUploader;
