import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';

import { Route, Redirect, MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute />', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();

    test('should show the component if autenticated & save localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAutenticated={ true }
                    component={ () => <span>Done!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    })
    
})
