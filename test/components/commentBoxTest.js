import { renderComponent , expect } from '../testHelper';
import CommentBox from '../../src/components/commentBox';

// Use 'describe' to group together similar tests
describe('CommentBox' , () => {
  let component;

  // create an instance of App
  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has the correct class', () => {
  	expect(component).to.have.class('comment-box');
  })

  // Use 'it' to test a single attribute of a target
  it('has a text area', () => {
  	// Use 'expect' to make an 'assertion' about a target
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
  	expect(component.find('button')).to.exist;
  });

  describe('entering some text', () => {
  	beforeEach(() => {
  		component.find('textarea').simulate('change', 'new comment');
  	});

  	it('shows that text in the textarea', () => {
  		expect(component.find('textarea')).to.have.value('new comment');
  	});

  	it('when submitted, clears the input', () => {
  		component.simulate('submit');
  		expect(component.find('textarea')).to.have.value('');
  	});
  })

});