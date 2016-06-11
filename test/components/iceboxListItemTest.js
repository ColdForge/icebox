import { renderComponent , expect } from '../testHelper';
import IceboxListItem from '../../src/components/iceboxListItem';

describe('IceboxListItem' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(IceboxListItem, {name: 'Bananas', foodGroup: 'Fruit', expiration: 5});
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });

  it('should render the name of item passed in', () => {
    expect(component).to.contain('Bananas');
  });

  it('should render the food group of item passed in', () => {
    expect(component.find('.food-group-icon')).to.exist();
  });

  it('should render the expiration of item passed in', () => {
    expect(component).to.contain(5);
  });

});
