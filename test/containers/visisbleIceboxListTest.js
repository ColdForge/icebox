import { renderComponent , expect } from '../testHelper';
import VisibleIceboxList from '../../src/containers/visibleIceboxList';
import DummyIcebox from '../../src/data/dummyFoodList';

let DummyItems = DummyIcebox.slice(0,4);

describe('VisibleIceboxList' , () => {
  let component;

  beforeEach(() => {
    const state = {
      icebox: DummyItems,
      sortBy: "SORT_EXPIRATION",
      sortOrder: "ASCENDING",
      iceboxSearch: "",
    }
    component = renderComponent(VisibleIceboxList, null, state);
  });

  it('is rendered successfully', () => {
    expect(component).to.exist;
  });

  it('should contain as many iceboxListItems as are in state.icebox', () => {
    expect(component.find('.iceboxListItem').length).to.equal(DummyItems.length);
  });

  describe('sorting the VisibleIceboxList', () => {
    it('should default to sorting by expiration date in ascending order', () => {
      const firstItem = component.find('.iceboxListItem').first().find('#expiration').text();
      const lastItem = component.find('.iceboxListItem').last().find('#expiration').text();
      expect(+firstItem).to.be.below(+lastItem);
    });

    it('should be able to be sorted in descending order', () => {
      let state = {
        icebox: DummyItems,
        sortBy: "SORT_EXPIRATION",
        sortOrder: "DESCENDING",
        iceboxSearch: "",
      }
      component = renderComponent(VisibleIceboxList, null, state);
      const firstItem = component.find('.iceboxListItem').first().find('#expiration').text();
      const lastItem = component.find('.iceboxListItem').last().find('#expiration').text();
      expect(+firstItem).to.be.above(+lastItem);
    });

    it('should be able to be sorted by food name', () => {
      let state = {
        icebox: DummyItems,
        sortBy: "SORT_FOODNAME",
        sortOrder: "ASCENDING",
        iceboxSearch: "",
      }
      component = renderComponent(VisibleIceboxList, null, state);
      const firstItem = component.find('.iceboxListItem').first().find('.item-name').text();
      const lastItem = component.find('.iceboxListItem').last().find('.item-name').text();
      expect(firstItem).to.be.below(lastItem);
    });

    it('should be able to be sorted by food group', () => {
      let state = {
        icebox: DummyItems,
        sortBy: "SORT_FOODGROUP",
        sortOrder: "ASCENDING",
        iceboxSearch: "",
      }
      component = renderComponent(VisibleIceboxList, null, state);
      const firstItem = component.find('.iceboxListItem').first().find('.list-item-container').data("food-group");
      const lastItem = component.find('.iceboxListItem').last().find('.list-item-container').data("food-group");
      expect(firstItem).to.be.below(lastItem);
    });

    it('should be able to be searched', () => {
      let state = {
        icebox: DummyItems,
        sortBy: "SORT_FOODNAME",
        sortOrder: "ASCENDING",
        iceboxSearch: "lettuce",
      }
      component = renderComponent(VisibleIceboxList, null, state);
      const firstItem = component.find('.iceboxListItem').first().find('.item-name').text();
      expect(firstItem).to.equal(DummyItems[3].name);
    })
  })



});
