import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        console.log(uid);

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const document = await db.collection(`${ uid }/journal/notes`).add( newNote );

        dispatch( activeNote( document.id, newNote ) );
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
        await dispatch( setNotes(notes) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});