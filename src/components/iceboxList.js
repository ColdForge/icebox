import React, { Component } from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';

const keyGenerator = () => {
  return Math.floor(Math.random()*100*Math.random()*22*Math.random()*43*Math.random()*1010102);
}
const CONTENTS = [
    {name: 'Bananas', foodGroup: 'Produce', expiration: 5, iconPath: '../../assets/fruit.png', key: keyGenerator()},
    {name: 'Ground Beef', foodGroup: 'Meat', expiration: 6, iconPath: '../../assets/meat.png', key: keyGenerator()},
    {name: 'Milk', foodGroup: 'Dairy', expiration: 1, iconPath: '../../assets/dairy.png', key: keyGenerator()}
];

class IceboxList extends Component {
	render(){
		return (
      <List subheader="Grocery List Items">
        {CONTENTS.map(item => {
          return (
            <IceboxListItem
              name={item.name}
              foodGroup={item.foodGroup}
              expiration={item.expiration}
              iconPath={item.iconPath}
              key={item.key}
            />
          );
        })}
      </List>
    );
	}
}

export default IceboxList;