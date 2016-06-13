import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';
import Landing from './components/landing';
import Signin from './containers/signin';
import Signup from './containers/signup';
import Icebox from './containers/icebox';

import reducers from './reducers';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers,window.devToolsExtension ? window.devToolsExtension() : f => f);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if(token) {
  // We need to update application state
  store.dispatch({ type: AUTHORIZE_USER });
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Landing} />
					<Route path="signin" component={Signin} />
					<Route path="signup" component={Signup} />
					<Route path="icebox" component={Icebox} />
				</Route>
			</Router>
		</Provider>
  </MuiThemeProvider>
  , document.getElementById('app'));
