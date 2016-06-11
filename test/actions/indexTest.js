import { expect } from '../testHelper';
import { ADD_COMMENT, ADD_FAVORITE, REMOVE_FAVORITE } from '../../src/actions/actionTypes';
import { addComment, addFavorite, removeFavorite } from '../../src/actions';

describe('actions' , () => {
	describe('addComment', () => {
		it('returns an action of type object', () => {
		  const action = addComment();
		  expect(action).to.be.an('object');
		});

		it('has the correct type', () => {
			const action = addComment();
			expect(action.type).to.equal(ADD_COMMENT);
		});

		it('has the correct payload', () => {
			const action = addComment('some comment');
			expect(action.payload).to.equal('some comment');
		});	
	});

	describe('addFavorite', () => {
		it('returns an action of type object', () => {
		  const action = addFavorite();
		  expect(action).to.be.an('object');
		});

		it('has the correct type', () => {
			const action = addFavorite();
			expect(action.type).to.equal(ADD_FAVORITE);
		});

		it('has the correct payload', () => {
			const action = addFavorite('some comment');
			expect(action.payload).to.equal('some comment');
		});	
	});

	describe('removeFavorite', () => {
		it('returns an action of type object', () => {
		  const action = removeFavorite();
		  expect(action).to.be.an('object');
		});

		it('has the correct type', () => {
			const action = removeFavorite();
			expect(action.type).to.equal(REMOVE_FAVORITE);
		});

		it('has the correct payload', () => {
			const action = removeFavorite('some comment');
			expect(action.payload).to.equal('some comment');
		});	
	});
});
