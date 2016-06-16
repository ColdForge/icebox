import { renderComponent , expect } from '../testHelper';
import App from '../../src/components/app';
import Landing from '../../src/components/landing';

// Use 'describe' to group together similar tests
describe('App' , () => {
  let component;

  // create an instance of App
  beforeEach(() => {
    component = renderComponent(App);
  });

  // Use 'it' to test a single attribute of a target
  xit('is rendered successfully', () => {
  	// Use 'expect' to make an 'assertion' about a target
    expect(component).to.exist;
  });

  xit('has a Header component', () => {
    expect(component.find('app-header')).to.exist;
  });

});
