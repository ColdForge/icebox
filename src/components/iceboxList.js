import React from 'react';
import { List } from 'material-ui/List';
import IceboxListItem from './iceboxListItem';

const IceboxList = ({ contents }) => {
  return (
    <List className="icebox-list">
      {contents.map(item => {
        return (
          <IceboxListItem
            key={item.key}
            item={item}
            name={item.name}
            foodGroup={item.foodGroup}
            expiration={item.expiration}
            iconPath={item.iconPath}
          />
        );
      })}
    </List>
  );
}

export default IceboxList;

// class IceboxList extends Component {
// 	render(){
// 		return (
//       <List subheader="Grocery List Items">
//         {this.props.contents.map(item => {
//           return (
//             <IceboxListItem
//               name={item.name}
//               foodGroup={item.foodGroup}
//               expiration={item.expiration}
//               iconPath={item.iconPath}
//               key={item.id}
//             />
//           );
//         })}
//       </List>
//     );
// 	}
// }

// export default IceboxList;