import { renderComponent , expect } from '../testHelper';
import IceboxList from '../../src/components/iceboxList';

describe('IceboxList' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(IceboxList);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });

  xit('should contain as many iceboxListItems as are passed in', () => {

  });

});
