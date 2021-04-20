import React from 'react';
import { mount } from 'enzyme';
import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";
import { MemoryRouter } from 'react-router';
import { PrivateRoute } from '../../routers/PrivateRoute';

describe('Pruebas en authReducer', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();

    test('should return the state by default', () => {
        const state = authReducer({ logged: false }, {} );
        expect( state ).toEqual({ logged: false });
    })

    test('should authenticate & colocate the name of user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Hernando'
            }
        }

        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual({ 
            logged: true,
            name: 'Hernando'
        });
    })

    test('should delete the name of user & login in false', () => {
        const action = {
            type: types.logout
        }

        const state = authReducer({ logged: true, name: 'Pedro' }, action);
        expect( state ).toEqual({ logged: false });
    })

    test('should block the component if not authenticate', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAutenticated={ false }
                    component={ () => <span>Done!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(false);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    })
    
    
})
