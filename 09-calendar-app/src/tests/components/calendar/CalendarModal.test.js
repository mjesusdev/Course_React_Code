import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import moment from 'moment';
import '@testing-library/jest-dom';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}))

// Configure Thunk and Store
const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus1 = now.clone().add(1,'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hello World',
            notes: 'Some notes',    
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Test'
    },
    ui: {
        modalOpen: true
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
)

describe('Test in <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should shows correctly', () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);
    })

    test('should run the refresh action and close modal', () => {
        wrapper.find('form').simulate('submit', { 
            preventDefault(){}
        });
        
        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalled();
    })
    
    test('should show error if not exists the title', () => {    
        wrapper.find('form').simulate('submit', { 
            preventDefault(){} 
        });
        
        expect( wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe( true );
    })

    test('should create a new event ✅', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'Test'
            },
            ui: {
                modalOpen: true
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello test'
            }
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });
        
        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title:'Hello test',
            notes: ''
        });
        
        expect( eventClearActiveEvent ).toHaveBeenCalled();
    })
    
    test('should validate the dates', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello test'
            }
        });
        
        const today = new Date();
        
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        })

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "The end date should older than the start date ❗", "error");

    })

})