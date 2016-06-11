import { expect } from '../testHelper';
import * as TYPES from '../../src/constants/actions';
import * as ACTIONS from '../../src/actions';

describe('actions' , () => {
	let action;

	describe('signinUser', () => {
		xit('should return a thunk', () => {

		});

		describe('on a successful signin', () => {
			xit('should dispatch an action of type AUTHORIZE_USER', () => {

			});

			xit('should set a JWT in the users localstorage', () => {

			});
		});

		describe('on an unsuccessful signin', () => {
			xit('should dispatch an action of type AUTHORIZE_ERROR', () => {

			});

			xit('should dispatch an action with payload of error response', () => {
				
			});
		});
	});

	describe('signupUser', () => {
		xit('should return a thunk', () => {

		});

		describe('on a successful signup', () => {
			xit('should dispatch an action of type AUTHORIZE_USER', () => {

			});

			xit('should set a JWT in the users localstorage', () => {

			});
		});

		describe('on an unsuccessful signup', () => {
			xit('should dispatch an action of type AUTHORIZE_ERROR', () => {

			});

			xit('should dispatch an action with payload of error response', () => {
				
			});
		});
	});

	describe('signoutUser', () => {
		xit('should remove the JWT in the users localstorage', () => {

		});

		xit('should return a thunk', () => {

		});

		xit('should dispatch an action of type DEAUTHORIZE_USER', () => {

		});
	});

	describe('authError', () => {
		beforeEach(() => {
		  action = ACTIONS.authError('Error message');
		});

		it('returns an action of type object', () => {
		  expect(action).to.be.an('object');
		});

		it('has the correct type', () => {
			expect(action.type).to.equal(TYPES.AUTHORIZE_ERROR);
		});

		it('has the correct payload', () => {
			expect(action.payload).to.equal('Error message');
		});	
	});
});
