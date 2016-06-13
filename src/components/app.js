import React, { Component } from 'react';
import AppHeader from './appHeader';

const styles = {
	container: {
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
}

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
      	<div style={styles.header}>
      		<AppHeader />
      	</div>
      	<div style={styles.body}>
      		{this.props.children}
      	</div>
      </div>
    );
  }
}

export default App;
