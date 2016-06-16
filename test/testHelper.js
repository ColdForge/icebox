import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from '../src/state/configureStore';


import reducers from '../src/reducers';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';


// Set up testing environment to run like a browser in the CL
// same as using window.document in the browser
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// Build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props = {}, state = {}) {
  let store = configureStore(true,state);

  const componentInstance = TestUtils.renderIntoDocument(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <ComponentClass {...props}/>
      </Provider>
    </MuiThemeProvider>
  );
  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

// Build helper for simulating events
// Adds a function 'simulate' to jquery
$.fn.simulate = function(eventName, value) {
  if(value) { // If a value is provided
    this.val(value); // Use jQuery to set value
  }
  TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
// Link chaiJquery up to chai, chai utilities, and jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };