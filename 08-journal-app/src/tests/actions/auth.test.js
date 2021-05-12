import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { login, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {};

let store = mockStore(initState);

describe('Test with the actions of Auth', () => {

    beforeEach( () => {
        store = mockStore(initState);
    });

    test('login and logout should create actions', () => {
        const uid = '123';
        const displayName = 'Pepito'

        const loginAction  = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });
    });

    test('should realise the logout', async() => {
        await store.dispatch( startLogout() );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('should start - startLoginEmailPassword', () => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'jPY5wTaaEXWKoGkrlXkekLnawVy1',
                displayName: null
            }
        });

    })
    
    
});