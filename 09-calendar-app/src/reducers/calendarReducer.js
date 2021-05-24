import moment from 'moment';
import { types } from '../types/types';

// Create a New State
const initialState = {
    events: [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'Jesus'
        }
    }],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {
    // Choose the case
    switch ( action.type ) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        
        default:
            return state;
    }
}
