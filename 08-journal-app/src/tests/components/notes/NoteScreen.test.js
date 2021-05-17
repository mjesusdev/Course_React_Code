import React from 'react';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: 1234,
            title: 'Hello',
            body: 'World',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>
);

describe('Test in <NoteScreen />', () => {
    
    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should exect the active note', () => {
        wrapper.find('input[name="title"]').simulate('change', { 
            target: { 
                name: 'title',
                value: 'Hello again'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'World',
                title: 'Hello again',
                id: 1234,
                date: 0
            }
        );
    });
});