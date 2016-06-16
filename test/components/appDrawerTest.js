import { renderComponent , expect } from '../testHelper';
import AppHeader from '../../src/components/appHeader';
// import AppDrawer from '../../src/components/appDrawer';

describe('AppDrawer' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AppHeader, null, { auth: {authenticated: true} });
  });

  it('is rendered successfully', () => {
    expect(component.find('.app-drawer')).to.exist;
  });

  it('has a profile button', () => {
    expect(component.find('.app-drawer-icebox')).to.exist;
  });

  it('has a recipes button', () => {
    expect(component.find('.app-drawer-recipes')).to.exist;
  });

  it('has a settings button', () => {
    expect(component.find('.app-drawer-settings')).to.exist;
  });

});
