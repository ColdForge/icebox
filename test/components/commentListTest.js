import { renderComponent , expect } from '../testHelper';
import CommentList from '../../src/components/commentList';

// Use 'describe' to group together similar tests
describe('CommentList' , () => {
  let component;

  // create an instance of App
  beforeEach(() => {
    const props = { comments: ['test comment 1','test comment 2']};
    component = renderComponent(CommentList, null, props);
  });

  it('shows a list item for each comment', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('shows each comment that is provided', () => {
  	expect(component).to.contain('test comment 1');
    expect(component).to.contain('test comment 2');
  });
});