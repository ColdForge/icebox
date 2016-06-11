import { renderComponent , expect } from '../testHelper';
import AppHeader from '../../src/components/appHeader';
import AppDrawer from '../../src/components/appDrawer';

describe('AppDrawer' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AppHeader, null, { auth: true });
  });

  it('is rendered successfully', () => {
    expect(component.find('.app-drawer')).to.exist;
  });

  it('has a profile menu item', () => {
    expect(component.find('.app-drawer-profile')).to.exist;
  });

  it('has a recipes menu item', () => {
    expect(component.find('.app-drawer-recipes')).to.exist;
  });

});
