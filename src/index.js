import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {
	green500,
	red500,
	blue500,
	green50,
	green200,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from './components/main';
import App from './components/app';
import Landing from './components/landing';
import Signin from './containers/signin';
import Signup from './containers/signup';
import Icebox from './components/icebox';
import Recipes from './components/recipes';
import FoodItemInput from './components/foodItemInput';
import Settings from './containers/settings';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import configureStore from './state/configureStore';
const store = configureStore();

const muiTheme = {
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: green500,
		primary2Color: red500,
		primary3Color: blue500,
		accent1Color: green200,
    accent2Color: green200,
    accent3Color: green200,
	},
};

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
		<Provider className="container" store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={Main}>
					<IndexRoute component={Landing} />
					<Route component={App}>
						<Route path="signin" component={Signin} />
						<Route path="signup" component={Signup} />
						<Route path="icebox" component={Icebox} />
	          <Route path="recipes" component={Recipes} />
	          <Route path="settings" component={Settings} />
	          <Route path="foodItemInput" component={FoodItemInput} />
					</Route>
				</Route>
			</Router>
		</Provider>
  </MuiThemeProvider>
  , document.getElementById('app'));
