import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers,window.devToolsExtension ? window.devToolsExtension() : f => f);

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
		<Provider store={store}>
		  <App />
		</Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
