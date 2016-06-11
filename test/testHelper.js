import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
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
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers,state)}>
      <ComponentClass {...props}/>
    </Provider>
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