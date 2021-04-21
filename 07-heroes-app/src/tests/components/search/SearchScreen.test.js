import React from 'react';
import { mount } from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router';

describe('Test in <SearchScreen />', () => {

    test('should show correctly with default values', () => {
        // Initial Route "/search"
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');
    });

    test('should show a hero & input with the value of queryString', () => {
        // Initial Route "/search?q=batman"
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        // Find a hero "batman" in the value of input
        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('should show a error ⛔ if the hero not found', () => {
        // Initial Route "/search?q=batman123" <-- Error not found this route
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe(`There is no a hero with batman123`);
        expect( wrapper ).toMatchSnapshot();
    });

    test('should initialice push history', () => {
        const history = {
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={ history }/> }
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith(`?q=batman`);
    });

})
