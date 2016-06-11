import React from 'react';
import { ListItem } from 'material-ui/List';

const IceboxListItem = ({name, foodGroup, expiration}) => (
  <ListItem className="iceboxListItem" primaryText={name} />
);

export default IceboxListItem;