import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '../ui/Navbar';

/* import 'moment/locale/es'; */
/* moment.locale('es'); */
/* import { messages } from '../../helpers/calendar-messages-es'; */

const localizer = momentLocalizer(moment);

const myEventsList = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa'
}]

export const CalendarScreen = () => {

    const eventPropGetter = ( event, start, end, isSelected ) => {
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
                /* messages={ messages } */
                eventPropGetter={ eventPropGetter }
            />
        </div>
    )
}
