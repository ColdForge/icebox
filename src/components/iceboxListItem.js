import React from 'react';
import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

const styles = {
  ListItem: {
    text: {
      color: "#000000"
    }
  }
}

const IceboxListItem = ({ name, foodGroup, expiration, key }) => {
  if (!name) {
    return <ListItem primaryText="Loading..." />
  }

  return (

    <ListItem
      key={key}
      className="iceboxListItem"
      leftIcon={
        <SvgIcon className="food-group-icon">
          <path className="icon" d={ICONS.Dairy.d} />
        </SvgIcon>
       }
      style={styles.ListItem.text}
    >

      {name}

      <div className="text-right expiration">
        {expiration}
      </div>

    </ListItem>
  );

};

export default IceboxListItem;

