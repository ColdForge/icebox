import React, { Component } from 'react';
import AppHeader from './appHeader';
import Icebox from '../containers/icebox';

class App extends Component {
  render() {
    return (
      <div>
      	<h1>ICEBOX</h1>
      	<AppHeader />
      	<Icebox />
      </div>
    );
  }
}

export default App;
