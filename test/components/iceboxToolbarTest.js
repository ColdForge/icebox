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

  describe('Search Tool', () => {
  	it('has a search button', () => {
  		expect(component.find('.icebox-toolbar-search')).to.exist;
  	});

  	it('has a SVG icon for search', () => {
  		expect(component.find('.icebox-toolbar-svgicon-search')).to.exist;
  	});
  });

  describe('Speech Tool', () => {
  	it('has a speech button', () => {
  		expect(component.find('.icebox-toolbar-speech')).to.exist;
  	});

  	it('has a SVG icon for speech', () => {
  		expect(component.find('.icebox-toolbar-svgicon-speech')).to.exist;
  	});
  });

  describe('Sort Tool', () => {
  	it('has a sort button', () => {
  		expect(component.find('.icebox-toolbar-sort')).to.exist;
  	});

  	it('has a SVG icon for sort', () => {
  		expect(component.find('.icebox-toolbar-svgicon-sort')).to.exist;
  	});
  });

});
