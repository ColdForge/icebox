import { renderComponent , expect } from '../testHelper';
import Icebox from '../../src/components/icebox';

describe('Icebox' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Icebox);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });

  xit('should have an iceboxToolbar component', () => {

  });

  xit('should have an iceboxList component', () => {

  });

});
