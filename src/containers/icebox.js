import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import IceboxToolbar from '../components/iceboxToolbar';
import IceboxList from '../components/iceboxList';

class Icebox extends Component {
	render(){
		return (
			<div>
				<IceboxToolbar />
        <IceboxList />
      </div>
		);
	}
}

function mapStateToProps(state){
	return { icebox: state.icebox, user: state.user };
}

export default connect(mapStateToProps,actions)(Icebox);
