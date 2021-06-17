import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

// Configure Thunk and Store
const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
)

describe('Test in <DeleteEventFab />', () => {

    test('should shows correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should run eventStartDelete when do click', () => {
        wrapper.find('button').simulate('click');

        expect( eventStartDelete ).toHaveBeenCalled();
    })
    
    
})
