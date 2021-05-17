import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hello',
    body: 'World',
    url: 'https://localhost/cualquier/cosa.jpg'
}

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry { ...note } /> 
    </Provider>
);

describe('Test in <JournalEntry />', () => {

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('should active the note', () => {
        wrapper.find('.journal__entry').simulate('click');

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );
    });
    
})
