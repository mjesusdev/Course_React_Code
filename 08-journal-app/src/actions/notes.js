import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        console.log(getState().auth);
        console.log(uid);
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
            dispatch( activeNote( doc.id, newNote ) );
            /* dispatch( addNewNote( doc.id, newNote ) ); */
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});