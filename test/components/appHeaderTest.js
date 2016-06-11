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
  	xit('should show the side drawer when the MenuIconButton is clicked', () => {

  	});

  	describe('when no user signed in', () => {
  		beforeEach(() => {
  			component = renderComponent(AppHeader, null, { auth: false });
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
  			component = renderComponent(AppHeader, null, { auth: true });
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
