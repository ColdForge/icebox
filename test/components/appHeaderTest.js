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

  it('should have the title of "Icebox"', () => {
  	expect(component).to.contain('Icebox');
  });

  describe('AppHeader interactivity', () => {
  	it('should hide the side drawer by default', () => {
  		expect(component.find('.app-drawer-overlay').css('opacity','0')).to.exist;
  	});

  	it('should show the side drawer when the MenuIconButton is clicked', () => {
  		component.find('.appheader-menu-button').simulate('click');
  		expect(component.find('.app-drawer-overlay').css('opacity','1')).to.exist;
  	});

  	describe('when no user signed in', () => {
  		beforeEach(() => {
  			component = renderComponent(AppHeader, null, { auth: { authenticated: false } });
  		});

  		it('should have a signup button', () => {
  			expect(component.find('.signup-button')).to.exist;
  		});

  		it('should have a signin button', () => {
  			expect(component.find('.signin-button')).to.exist;
  		});
  	});

  	describe('when a user is signed in', () => {
  		beforeEach(() => {
  			component = renderComponent(AppHeader, null, { auth: { authenticated: true } });
  		});

  		it('should have a help button', () => {
  			expect(component.find('.help-button')).to.exist;
  		});

  		it('should have a signout button', () => {
  			expect(component.find('.signout-button')).to.exist;
  		});
  	});
  });
  
});
