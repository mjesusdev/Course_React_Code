import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {
    auth : {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen /> 
        </MemoryRouter>
    </Provider>
);

describe('Test in <LoginScreen />', () => {
    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch the action of startGoogleLogin', () => {
        wrapper.find('.google-btn').simulate('click');

        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('should dispatch the startLogin with the arguments', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault() {}
        });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith('prueba@gmail.com', '123456');
    })
});