import { renderComponent , expect } from '../testHelper';
import IceboxList from '../../src/components/iceboxList';

describe('IceboxList' , () => {
  let component;

  beforeEach(() => {
    const CONTENTS = [
    {name: 'Bananas', foodGroup: 'Produce', expiration: 5},
    {name: 'Ground Beef', foodGroup: 'Meat', expiration: 6},
    {name: 'Milk', foodGroup: 'Dairy', expiration: 1}
    ]
    component = renderComponent(IceboxList,{contents: CONTENTS});
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });


  it('should contain as many iceboxListItems as are passed in', () => {
    expect(component.find('ListItem').length).to.equal(3);
  });

});
