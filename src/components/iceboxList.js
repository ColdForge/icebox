import React, { Component } from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';

class IceboxList extends Component {
	render(){
		return (
      <List>
        {this.props.contents.map(item => (
          <IceboxListItem  />
        ))}
      </List>
		);
	}
}

export default IceboxList;