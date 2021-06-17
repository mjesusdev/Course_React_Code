import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn()
}));

// Configure Thunk and Store
const middlewars = [ thunk ];
const mockStore = configureStore(middlewars);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
)

describe('Test in <LoginScreen />', () => {

    test('should shows correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('should run dispatch of the button login', () => {
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: { 
                name: 'lEmail',
                value: 'hola@jesus.com'
            }
        })

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: { 
                name: 'lPassword',
                value: '123456789'
            }
        })

        wrapper.find('form').at(0).prop('onSubmit')( {
            preventDefault() {}
        });

        expect( startLogin ).toHaveBeenCalledWith('hola@jesus.com', '123456789');

    })
    
    
})
