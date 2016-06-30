import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppHeader from './appHeader';
import IconButton from 'material-ui/IconButton';
import GoUp from 'material-ui/svg-icons/navigation/expand-less';

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
		<div
			id="goTop"
			className="goTop"
		>
			<IconButton
				iconStyle={{ width: 54, height: 54 }}
				style={{ width: 64, height: 64, padding: 8 }}
				onTouchTap={() => window.scrollTo(0, 0)}
				tooltip="Go to top"
				tooltipPosition="bottom-center"
			>
				<GoUp
					color="white"
				/>
			</IconButton>
		</div>

	</div>
);

App.propTypes = {
	children: React.PropTypes.element,
};

export default App;
