import { db } from "../firebase/firebase-config";

export const loadNotes = async ( uid ) => {

    console.log(uid);
    
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    
    console.log(notesSnap);
    console.log(notes);

    return notes;

}
