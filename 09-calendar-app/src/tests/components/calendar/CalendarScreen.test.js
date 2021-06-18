import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import { act } from '@testing-library/react';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import messages from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));
Storage.prototype.setItem = jest.fn();

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
        
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });
        
        calendar.prop('onSelectEvent')({ start: 'Hello' });
        expect( eventSetActive ).toHaveBeenCalledWith({start: 'Hello'});

        act(() => {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
        })

    })
    
    
    
})
