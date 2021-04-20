import React from 'react';
import { mount } from "enzyme";
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router';


describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    
    test('should show the component redirect if not arguments in the URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history } />
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('should show hero if the param exists & find itself', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
    });

    test('should return at display before with PUSH', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        // Simulate Click
        wrapper.find('button').prop('onClick')();
        
        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
    });

    test('should return at display before', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider333']}>
                <Route
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        // Simulate Click
        wrapper.find('button').prop('onClick')();
        
        expect( history.push ).toHaveBeenCalledTimes(0);
        expect( history.goBack ).toHaveBeenCalled();
    })

    test('should execute the redirect if the hero not exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider222']}>
                <Route
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
    })
})
