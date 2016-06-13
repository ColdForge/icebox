import React, { Component } from 'react';
import AppHeader from './appHeader';
import Icebox from '../containers/icebox';

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
