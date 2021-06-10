import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus1 = now.clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState( true );

    const [formValues, setFormValues] = useState( initEvent );
    
    const { notes, title, start, end } = formValues;
    
    useEffect( () => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    
    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        // Clear the form
        setFormValues( initEvent );
    }

    const handleStartDateChange = ( event ) => {
        setDateStart(event);
        setFormValues({
            ...formValues,
            start: event
        })
    }
    
    const handleEndDateChange = ( event ) => {
        setDateEnd(event);
        setFormValues({
            ...formValues,
            end: event
        })
    }

    const handleSubmitForm = ( event ) => {
        event.preventDefault();

        const momentStart = moment( start );
        const momentEnd   = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd )) {
            Swal.fire('Error', 'The end date should older than of the start date', 'error');
        }

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        if ( activeEvent ) {
            dispatch( eventUpdated( formValues ) );
        } else {
            dispatch( eventStartAddNew(formValues) );
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen= { modalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1 className="text-info"> { ( activeEvent ) ? 'Edit Event' : 'New Event' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <label>Start Date and Hour</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                        
                    />
                </div>
                <div className="form-group">
                    <label>Finally Date and Hour</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Title & notes</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid' }`}
                        placeholder="Title of the Event"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">A small description</small>
                </div>
                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Adittional Information</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block mt-4"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>

        </Modal>
    )
}
