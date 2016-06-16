import { renderComponent , expect } from '../testHelper';
import IceboxList from '../../src/components/iceboxList';

describe('IceboxList' , () => {
  let component;

  beforeEach(() => {
    const CONTENTS = [
    {name: 'Bananas', foodGroup: 'Produce', expiration: 5, key: "2jj231j123j3123ddD"},
    {name: 'Ground Beef', foodGroup: 'Meat', expiration: 6, key: "2jj231j12WEEW3j3123ddD"},
    {name: 'Milk', foodGroup: 'Dairy', expiration: 1, key: "2jj231jOPWEE0003j3123ddD"}
    ]
    component = renderComponent(IceboxList,{contents: CONTENTS});
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });

  it('should contain as many iceboxListItems as are passed in', () => {
    expect(component.find('.iceboxListItem').length).to.equal(3);
  });

});
