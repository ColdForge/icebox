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

const IceboxListItem = ({ name, foodGroup, expiration }) => {
  if (!name) {
    // return <ListItem Loading...;
  }
  // const { name, foodGroup, expiration } = item;
  return (
    <ListItem

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

