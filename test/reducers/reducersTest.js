import { expect } from '../testHelper';
import * as TYPES from '../../src/constants/actions';
import authReducer from '../../src/reducers/authReducer';

describe('reducers' , () => {
	describe('authReducer', () => {
		it('handles an action of unknown type', () => {
		  expect(authReducer(undefined,{})).to.eql({});
		});

		it('correctly handles an action of type AUTHORIZE_USER', () => {
			const action = {type:TYPES.AUTHORIZE_USER};
			expect(authReducer(undefined,action)).to.eql({ error: '', authenticated: true });
		});

		it('correctly handles an action of type DEAUTHORIZE_USER', () => {
			const action = {type:TYPES.DEAUTHORIZE_USER};
			expect(authReducer(undefined,action)).to.eql({ authenticated: false });
		});

		it('correctly handles an action of type AUTHORIZE_ERROR', () => {
			const action = {type:TYPES.AUTHORIZE_ERROR,payload:'Error message'};
			expect(authReducer(undefined,action)).to.eql({ error: 'Error message' });
		});
	})
});