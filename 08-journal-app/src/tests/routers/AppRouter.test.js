import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import { firebase } from '../../firebase/firebase-config';

import { login } from '../../actions/auth';
import { AppRouter } from "../../routers/AppRouter";

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {
    auth : {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();



describe('Test in <AppRouter />', () => {
    
    test('should show correctly', async() => {

        let user;

        await act( async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter /> 
                    </MemoryRouter>
                </Provider>
            );

        });

        expect( login ).toHaveBeenCalledWith('jPY5wTaaEXWKoGkrlXkekLnawVy1', null);

    })
    
})
