import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppHeader from './appHeader';

const styles = {
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		height: '100%',
	},
	header: {
		flex: 0,
	},
	body: {
		flex: 10,
	},
};

const myFunction = () => {
	if (document.body.scrollTop > 72 || document.documentElement.scrollTop > 72) {
		document.getElementById('appheader').className = 'appheader-hidden';
		document.getElementById('icebox-toolbar').className = 'icebox-toolbar-scroll';
	} else {
		document.getElementById('appheader').className = 'appheader';
		document.getElementById('icebox-toolbar').className = 'icebox-toolbar';
	}
}

window.onscroll = function () {
	myFunction();
};


const App = ({ children }) => (
	<div style={styles.container} className="app-container">
		<AppHeader />
		<div
			style={styles.body}
			className="app-body"
		>
			<ReactCSSTransitionGroup
				component="div" transitionName="example" className="animation-container"
				transitionEnterTimeout={500} transitionLeaveTimeout={500}
			>
				{React.cloneElement(children, {
					key: location.pathname,
				})}
			</ReactCSSTransitionGroup>
		</div>
	</div>
);

App.propTypes = {
	children: React.PropTypes.element,
};

export default App;
