import { renderComponent , expect } from '../testHelper';
import FavoriteList from '../../src/components/favoriteList';

// Use 'describe' to group together similar tests
describe('FavoriteList' , () => {
  let component;

  // create an instance of App
  beforeEach(() => {
    const props = { favorites: ['favorite comment 1','favorite comment 2']};
    component = renderComponent(FavoriteList, null, props);
  });

  it('shows a list item for each favorite', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('shows each favorite that is provided', () => {
  	expect(component).to.contain('favorite comment 1');
    expect(component).to.contain('favorite comment 2');
  });
});