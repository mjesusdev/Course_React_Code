import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Test in authReducer', () => {
    test('should realise login', () => {
        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Jesus'
            }
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Jesus'
        });
    });

    test('should realise logout', () => {
        const initState = {
            uid: 'abc',
            displayName: 'Jesus'
        };

        const action = {
            type: types.logout
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
    });

    test('not should any changes at state', () => {
        const initState = {
            uid: 'abc',
            displayName: 'Jesus'
        };

        const action = {
            type: '123421'
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
    });
});
