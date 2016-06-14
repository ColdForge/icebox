import React, { Component } from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';
import dataList from '../data/dummyFoodList';

class IceboxList extends Component {
	render(){
    console.log('this.props is : ',this.props);
		return (
      <List subheader="Grocery List Items">
        {this.props.contents.map(item => {
          return (
            <IceboxListItem
              name={item.name}
              foodGroup={item.foodGroup}
              expiration={item.expiration}
              iconPath={item.iconPath}
              key={item.id}
            />
          );
        })}
      </List>
    );
	}
}

export default IceboxList;