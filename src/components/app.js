import React, { Component } from 'react';
import AppHeader from './appHeader';
import Icebox from '../containers/icebox';

class App extends Component {
  render() {
    return (
      <div>
      	<AppHeader />
      	<Icebox />
      </div>
    );
  }
}

export default App;
