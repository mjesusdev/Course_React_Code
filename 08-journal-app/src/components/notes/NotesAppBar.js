import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    
    const noteDate = moment( Date() );
    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSaveNote(active) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if ( file ) {
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('dddd DD MMM YYYY') }</span>

            <input
                id="fileSelector"
                type="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            >
            
            </input>

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
