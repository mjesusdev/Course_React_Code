import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { authContext } from '../../auth/authContext';

describe('Tests on <AppRouter />', () => {
    test('should show login if not authenticate ', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        }
        
        const wrapper = mount(
            <authContext.Provider value={ contextValue }>
                <AppRouter />
            </authContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('Login');
    })
    
    test('should show component marvel if is authenticate', () => {
        const contextValue = {
            user: {
                dispatch: jest.fn(),
                logged: true,
                name: 'Pepe'
            }
        }
        
        const wrapper = mount(
            <authContext.Provider value={ contextValue }>
                <AppRouter />
            </authContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe(true);
    })
})