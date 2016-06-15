import React from 'react';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';

const Icebox = () => {
	return (
		<div className="icebox-container">
			<IceboxToolbar />
      <VisibleIceboxList />
    </div>
	);
}

export default Icebox;

// class Icebox extends Component {
// 	render(){
// 		return (
// 			<div className="icebox-container">
// 				<IceboxToolbar />
//         <VisibleIceboxList />
//       </div>
// 		);
// 	}
// }

// function mapStateToProps(state){
// 	return { icebox: state.icebox, user: state.user };
// }

// export default connect(mapStateToProps,actions)(Icebox);
