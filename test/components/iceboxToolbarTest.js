import { renderComponent , expect } from '../testHelper';
import IceboxToolbar from '../../src/components/iceboxToolbar';

describe('IceboxToolbar' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(IceboxToolbar);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });



});
