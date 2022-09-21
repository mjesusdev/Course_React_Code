import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from "../../../components/login/LoginScreen";
import { authContext } from '../../../auth/authContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {

    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    
    const wrapper = mount(
        <authContext.Provider value={ contextValue }>
            <LoginScreen history={ history }/>
        </authContext.Provider>
    );

    test('should show the component correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should execute dispatch & the navigation', () => {
        // Simulate Click
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Pepito'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');
        
        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect( history.replace ).toHaveBeenCalledWith('/dc');
    });
});