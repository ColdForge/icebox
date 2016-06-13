import React, { Component } from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';

const CONTENTS = [
    {name: 'Bananas', foodGroup: 'Produce', expiration: 5},
    {name: 'Ground Beef', foodGroup: 'Meat', expiration: 6},
    {name: 'Milk', foodGroup: 'Dairy', expiration: 1}
];

class IceboxList extends Component {
	render(){
		return (
      <List>
        {CONTENTS.map(item => {
          return (
            <IceboxListItem
              name={item.name}
              foodGroup={item.foodGroup}
              expiration={item.expiration}
            />
          );
        })}
      </List>
		);
	}
}

export default IceboxList;