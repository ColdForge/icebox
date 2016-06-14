import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../actions';


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
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<TextField {...email} floatingLabelText="Email" errorText={email.touched && email.error && <div className="error">{email.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...name} floatingLabelText="Name" errorText={name.touched && name.error && <div className="error">{name.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...password} type="password" floatingLabelText="Password" errorText={password.touched && password.error && <div className="error">{password.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...passwordConfirm} type="password" floatingLabelText="Confirm your password:" errorText={passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>} />
				</fieldset>
				<RaisedButton type="submit" label="Sign up!" primary={true}></RaisedButton>
				{this.renderError()}
			</form>
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
