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

  		});

  		it('should have a signin button', () => {
  			
  		});
  	});

  	describe('when a user is signed in', () => {
  		beforeEach(() => {
  			component = renderComponent(AppHeader, null, { auth: true });
  		});

  		it('should have a signup button', () => {

  		});

  		it('should have a signin button', () => {
  			
  		});
  	});
  });
  
});
