import { renderComponent , expect } from '../testHelper';
import App from '../../src/components/app';

// Use 'describe' to group together similar tests
describe('App' , () => {
  let component;

  // create an instance of App
  beforeEach(() => {
    component = renderComponent(App);
  });

  // Use 'it' to test a single attribute of a target
  it('renders something', () => {
  	// Use 'expect' to make an 'assertion' about a target
    expect(component).to.exist;
  });

  it('shows a comment box', () => {
  	expect(component.find('.comment-box')).to.exist;
  });

  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist;
  });

  it('shows a favorite list', () => {
    expect(component.find('.favorite-list')).to.exist;
  });
});
