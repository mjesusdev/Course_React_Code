import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
/* import 'moment/locale/es'; */
/* moment.locale('es'); */
/* import { messages } from '../../helpers/calendar-messages-es'; */

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // TODO: Read of store, the events
    const { events } = useSelector(state => state.calendar); 

    const [ lastView, setlastView ] = useState( localStorage.getItem('lastView') || 'month' );

    const onDoubleClick = () => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (event) => {
        dispatch( eventSetActive( event ) );
        dispatch( uiOpenModal() );
    }

    const onViewChange = (event) => {
        setlastView( event );
        localStorage.setItem('lastView', event);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        console.log( event, start, end, isSelected);

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent 
                }}
            />

            <AddNewFab />

            <CalendarModal />

        </div>
    )
}
