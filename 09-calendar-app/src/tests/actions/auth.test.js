import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

// Configure Thunk and Store
const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Test in Actions - auth.js', () => {

    beforeEach( () => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    // First Test - Login in Backend & more
    test('startLogin correct', async () => {
        await store.dispatch( startLogin('hola@jesus.com', '123456789') );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });
        
        // Test with localStorage
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        
        /* token = localStorage.setItem.mock.calls[0][1]; */
    })
    
    test('startLogin incorrect', async () => {
        await store.dispatch( startLogin('hola@jesus.com', '12345678') );
        const actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Incorrect Password ❗', 'error'); 
    })

    test('startRegister correct', async () => {

        fetchModule.fetchWitoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test',
                    token: 'ABC123'
                }
            }
        }));

        await store.dispatch( startRegister('hola@test.com', '123456789', 'test') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
})