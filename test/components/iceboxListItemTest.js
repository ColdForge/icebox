import { renderComponent , expect } from '../testHelper';
import IceboxListItem from '../../src/components/iceboxListItem';

describe('IceboxListItem' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(IceboxListItem);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });

});
