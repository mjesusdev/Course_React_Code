import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();

            if ( body.ok ) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch( eventAddNew(event) );
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = ( event ) => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchWithToken(`events/${ event.id }`, event, 'PUT');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);    
        }
    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = ( event ) => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchWithToken(`events/${ id }`, event, 'DELETE');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);    
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoading = () => {
    return async ( dispatch ) => {
        try {
            
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            
            const events = prepareEvents(body.events);
            dispatch( eventLoaded(events) );
            
        } catch (error) {
            console.log(error);
        }
    }
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogout = () => ({ 
    type: types.eventLogout 
});