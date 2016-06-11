import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import IceboxList from '../components/iceboxList';

class Icebox extends Component {
	render(){
		return (
			<div>
        <IceboxList />
      </div>
		);
	}
}

export default Icebox;