import React from 'react';
import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

var classNames = require('classnames');

const styles = {
  ListItem: {
    text: {
      color: "#000000"
    }
  }
}

const IceboxListItem = ({ name, foodGroup, iconPath, expiration }) => {
  if (!name) {
    return <ListItem primaryText="Loading..." />
  }

  let textColor = 'expiration-black';

  // if the expiration === 1
  if (expiration > 0 && expiration <= 3) {
    // class will equal red for expiration div
    textColor = 'expiration-red';
  }
  // if the expiration > 1 && <= 3
  if (expiration > 3 && expiration <= 6){
    // class will equal orange for expiration date
    textColor = 'expiration-orange'
  }
  // if the expiration > 3
  if (expiration > 7) {
    // class will be default
    textColor = 'expiration-black'
  }


  return (

      <ListItem
        className="iceboxListItem"
        // leftIcon={<img className="food-group-icon" src={iconPath}/>}
        style={styles.ListItem.text}>
        <div className="list-item-container" data-food-group={foodGroup}>
          <img className="food-group-icon" src={iconPath}/>
          <div className="item-name">
            {name}
          </div>
          <div className={textColor} id="expiration">
            {expiration}
          </div>
        </div>
      </ListItem>

  );

};

export default IceboxListItem;

