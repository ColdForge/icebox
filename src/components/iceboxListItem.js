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

const IceboxListItem = ({ name, foodGroup, iconPath, expiration, key }) => {
  if (!name) {
    return <ListItem primaryText="Loading..." />
  }

  return (

    <ListItem
      key={key}
      className="iceboxListItem"
      leftIcon={<img src={iconPath}/>}
      style={styles.ListItem.text}>
      <div className="container-fluid">
        <div className="item-name">
          {name}
        </div>

        <div className="item-expiration">
          {expiration}
        </div>
      </div>

    </ListItem>

  );

};

export default IceboxListItem;

