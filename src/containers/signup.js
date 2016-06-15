import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import * as actions from '../actions';

const styles = {
	labelStyle: {
		color: '#FFFFFF',
	},
}

class Signup extends Component {
	handleFormSubmit({ email, name, password }) {
		this.props.signupUser({ email, name, password });
	}

	renderError(){
		if(this.props.errorMessage){
			return <div>{this.props.errorMessage}</div>
		}
	}

	render() {
		const { handleSubmit, fields: { email, name, password, passwordConfirm }} = this.props;

		return (
			<div className="signup-div">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-md-offset-4">
							<div className="signup-form">
								<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
									<fieldset className="form-group text-field-input">
										<TextField {...email} floatingLabelText="Email" inputStyle={styles.labelStyle} floatingLabelStyle={styles.labelStyle} errorText={email.touched && email.error && <div className="error">{email.error}</div>} />
									</fieldset>
									<fieldset className="form-group text-field-input">
										<TextField {...name} floatingLabelText="Name" inputStyle={styles.labelStyle} floatingLabelStyle={styles.labelStyle} errorText={name.touched && name.error && <div className="error">{name.error}</div>} />
									</fieldset>
									<fieldset className="form-group text-field-input">
										<TextField {...password} type="password" floatingLabelText="Password" inputStyle={styles.labelStyle} floatingLabelStyle={styles.labelStyle} errorText={password.touched && password.error && <div className="error">{password.error}</div>} />
									</fieldset>
									<fieldset className="form-group text-field-input">
										<TextField {...passwordConfirm} type="password" floatingLabelText="Confirm your password:" inputStyle={styles.labelStyle} floatingLabelStyle={styles.labelStyle} errorText={passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>} />
									</fieldset>
									<FlatButton type="submit" label="Sign up!" className="signup-form-button" backgroundColor="#FA6900" hoverColor="#F38630" />
									{this.renderError()}
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

	if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formProps.email)){
		errors.email = 'Please enter a valid email address';
	}

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}

	if (!formProps.name) {
		errors.name = 'Please enter a name!';
	}

	if (formProps.password !== formProps.passwordConfirm){
		errors.password = 'Passwords must match';
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}

	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	return errors;
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'name', 'password', 'passwordConfirm'],
	validate
}, mapStateToProps, actions)(Signup);
