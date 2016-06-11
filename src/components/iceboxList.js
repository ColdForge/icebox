import React, { Component } from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';

const CONTENTS = [
    {name: 'Bananas', foodGroup: 'Produce', expiration: 5, id: 1},
    {name: 'Ground Beef', foodGroup: 'Meat', expiration: 6, id: 2},
    {name: 'Milk', foodGroup: 'Dairy', expiration: 1, id: 3}
];

class IceboxList extends Component {
	render(){
		return (
      <List>
        {CONTENTS.map(item => {
          return (
            <IceboxListItem
              key={item.id}
              item={item}
            />
          );

        })}
      </List>
		);
	}
}

export default IceboxList;