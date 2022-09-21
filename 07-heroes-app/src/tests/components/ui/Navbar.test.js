import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router';
import '@testing-library/jest-dom';

import { Navbar } from '../../../components/ui/Navbar';
import { authContext } from '../../../auth/authContext';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Juanito'
        }
    }

    const wrapper = mount(
        <authContext.Provider value={ contextValue }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </authContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Juanito');
    });

    test('should logout & use history', () => {
        
        // Simulate click
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');

    });
    
    
})
