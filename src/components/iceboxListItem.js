import React from 'react';
import { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';

const IceboxListItem = ({ name, foodGroup, expiration }) => (
  <ListItem
    key={name+foodGroup}
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
  />
);

export default IceboxListItem;

