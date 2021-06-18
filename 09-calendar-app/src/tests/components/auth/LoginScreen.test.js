import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
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

    beforeEach( () => {
        jest.clearAllMocks();
    })

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
    
    test('should not have registers if the passwords are different', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: { 
                name: 'rPassword1',
                value: '1234567'
            }
        })
        
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: { 
                name: 'rPassword2',
                value: '12345678'
            }
        })
        
        wrapper.find('form').at(1).prop('onSubmit')( {
            preventDefault() {}
        });
        
        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'The password should be the same', 'error');
        
    })
    
    test('should run register with passwords 🔐', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: { 
                name: 'rPassword1',
                value: 'hello world'
            }
        })
        
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: { 
                name: 'rPassword2',
                value: 'hello world'
            }
        })
        
        wrapper.find('form').at(1).prop('onSubmit')( {
            preventDefault() {}
        });
        
        expect( Swal.fire ).not.toHaveBeenCalled();
        expect( startRegister ).toHaveBeenCalledWith('nando@gmail.com', 'hello world', 'Nando');
        
    })
    

})
