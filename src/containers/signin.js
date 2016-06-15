import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';

const styles = {
	labelStyle: {
		color: '#FFFFFF',
	},
}

class Signin extends Component {
	handleFormSubmit({ email, password }) {
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div>
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const { handleSubmit, fields: { email, password }} = this.props;

		return (
			<div className="signin-div">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-md-offset-4">
							<div className="signin-form">
								<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
									<fieldset className="form-group text-field-input">
										<TextField {...email} floatingLabelText="Email" inputStyle={styles.labelStyle} floatingLabelStyle={styles.labelStyle} errorText={email.touched && email.error && <div className="error">{email.error}</div>} />
									</fieldset>
									<fieldset className="form-group text-field-input">
										<TextField {...password} type="password" floatingLabelText="Password" inputStyle={styles.labelStyle} floatingLabelStyle={styles.labelStyle} errorText={password.touched && password.error && <div className="error">{password.error}</div>} />
									</fieldset>
									{ this.renderAlert() }
									<FlatButton type="submit" label="Sign in" className="signin-form-button" backgroundColor="#FA6900" hoverColor="#F38630" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}

function validate(formProps) {
	const errors = {};

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}

	return errors;
}

export default reduxForm({
	form: 'signin',
	fields: ['email','password'],
	validate
}, mapStateToProps, actions)(Signin);
