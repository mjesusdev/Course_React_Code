import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-redux-dom'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from "../../../components/auth/LoginScreen";

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
    });

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    }); 
});
