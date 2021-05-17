import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {
    auth : {
        uid: '1',
        name: 'Jesus'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>
);

describe('Test in <Sidebar />', () => {

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
        // Snapshot
    });

    test('should function startLogout', () => {
        // Simulate Click Logout
        wrapper.find('button').simulate('click');

        expect( startLogout ).toHaveBeenCalled();
    })

    test('should function startNewNote', () => {
        // Simulate Click startNewNote
        wrapper.find('.journal__new-entry').simulate('click');

        expect( startNewNote ).toHaveBeenCalled();
    });
});
