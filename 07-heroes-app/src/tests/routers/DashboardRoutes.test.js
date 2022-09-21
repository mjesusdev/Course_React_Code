import React from 'react';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router';
import { authContext } from '../../auth/authContext';

describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Juanito'
        }
    }

    test('should show correctly', () => {

        const wrapper = mount(
            <authContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </authContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Juanito');
    })
    
})
