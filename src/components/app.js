import React, { Component } from 'react';
import AppHeader from './appHeader';

class App extends Component {
  render() {
    return (
      <div>
      	<AppHeader />
      	{this.props.children}
      </div>
    );
  }
}

export default App;
