import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
/* import 'moment/locale/es'; */
/* moment.locale('es'); */
/* import { messages } from '../../helpers/calendar-messages-es'; */

const localizer = momentLocalizer(moment);

const myEventsList = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Jesus'
    }
}]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [ lastView, setlastView ] = useState( localStorage.getItem('lastView') || 'month' );

    const onDoubleClick = () => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (event) => {
        console.log(event);
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
                events={ myEventsList }
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

            <CalendarModal />

        </div>
    )
}
