import React from 'react';

// const styles = {
// 	container: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		justifyContent: 'flex-start',
// 		height: '100%',
// 	},
// 	header: {
// 		flex: 0,
// 	},
// 	body: {
// 		flex: 10,
// 	},
// };

const Main = ({ children }) => (
	<div className="main">
		{children}
	</div>
);

Main.propTypes = {
	children: React.PropTypes.element,
};

export default Main;
