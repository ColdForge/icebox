import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';
import Landing from './components/landing';
import Signin from './containers/signin';
import Signup from './containers/signup';
import Icebox from './components/icebox';
import Recipes from './components/recipes';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import configureStore from './state/configureStore';
const store = configureStore();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
		<Provider className="container" store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Landing} />
					<Route path="signin" component={Signin} />
					<Route path="signup" component={Signup} />
					<Route path="icebox" component={Icebox} />
          <Route path="recipes" component={Recipes} />
				</Route>
			</Router>
		</Provider>
  </MuiThemeProvider>
  , document.getElementById('app'));
