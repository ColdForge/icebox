import { renderComponent , expect } from '../testHelper';
import Icebox from '../../src/containers/icebox';

describe('Icebox' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Icebox);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });



});
