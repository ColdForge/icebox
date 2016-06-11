import { renderComponent , expect } from '../testHelper';
import AppHeader from '../../src/components/appHeader';

describe('AppHeader' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AppHeader);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });



});
