import React from 'react';
import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

const styles = {
  ListItem: {
    text: {
      color: "#000000",
    }
  }
}

const IceboxListItem = ({ name, foodGroup, expiration, key }) => {
  if (!name) {
    return <ListItem primaryText="Loading..." />
  }

  console.log("This is d: ", ICONS.Dairy.d)

  return (

    <ListItem
      key={key}
      className="iceboxListItem"
      primaryText={name}
      leftIcon={
        <SvgIcon className="food-group-icon">
          <path className="icon" d={ICONS.Dairy.d} />
         </SvgIcon>
       }
      children={
        <div>
          <p>{expiration}</p>
        </div>
      }
      style={styles.ListItem.text}
    />
  );

};

export default IceboxListItem;

