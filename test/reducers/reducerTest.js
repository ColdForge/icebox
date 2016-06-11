import { expect } from '../testHelper';
import commentsReducer from '../../src/reducers/commentsReducer';
import favoritesReducer from '../../src/reducers/favoritesReducer';
import { ADD_COMMENT, ADD_FAVORITE, REMOVE_FAVORITE } from '../../src/actions/actionTypes';

describe('reducers' , () => {
	describe('commentsReducer', () => {
		it('handles an action of unknown type', () => {
		  expect(commentsReducer(undefined,{})).to.eql([]);
		});

		it('correctly handles an action of type ADD_COMMENT', () => {
			const action = {type:ADD_COMMENT,payload:'test comment'};
			expect(commentsReducer(undefined,action)).to.eql(['test comment']);
		});
	});
	describe('favoritesReducer', () => {
		it('handles an action of unknown type', () => {
		  expect(favoritesReducer(undefined,{})).to.eql([]);
		});

		it('correctly handles an action of type ADD_FAVORITE', () => {
			const action = {type:ADD_FAVORITE,payload:'test favorite comment'};
			expect(favoritesReducer(undefined,action)).to.eql(['test favorite comment']);
		});

		it('should not favorite the same comment twice', () => {
			const action = {type:ADD_FAVORITE,payload:'test favorite comment'};
			favoritesReducer(undefined,action);
			expect(favoritesReducer(undefined,action)).to.eql(['test favorite comment']);
		});

		it('correctly handles an action of type REMOVE_FAVORITE', () => {
			const action = {type:REMOVE_FAVORITE,payload:'test favorite comment'};
			expect(favoritesReducer(['test favorite comment'],action)).to.eql([]);
		});
	});
});