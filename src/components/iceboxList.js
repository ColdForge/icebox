import React, { Component } from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';
import dataList from '../data/dummyFoodList';

const keyGenerator = () => {
  return Math.floor(Math.random()*100*Math.random()*22*Math.random()*43*Math.random()*1010102);
}

class IceboxList extends Component {
	render(){
		return (
      <List subheader="Grocery List Items">
        {dataList.map(item => {
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