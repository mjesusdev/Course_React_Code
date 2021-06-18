import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

/* jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
})); */

// Configure Thunk and Store
const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'Test'
    },
    ui: {
        openModal: false
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
)

describe('Test in <CalendarScreen />', () => {

    test('should shows correctly', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('test with the component Calendar', () => {
        
    })
    
    
    
})
