import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* import jest from "jest-environment-node";
 */
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}));

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'WaUUglUQUV6dZa0YboY8',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore(initState);

describe('Test in notes-action', () => {
    beforeEach( () => {
        store = mockStore(initState);
    });

    test('should create a new note - startNewNote', async() => {
        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // Get ID Notes
        const docId = actions[0].payload.id;
        // Delete Note that upload in Firebase
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();
    });

    test('should upload the notes - startLoadingNotes', async() => {
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expected.any(String),
            title: expected.any(String),
            body: expected.any(String),
            date: expected.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
    });

    test('should update the note - startSaveNote', async() => {   
        const note = {
            id: 'WaUUglUQUV6dZa0YboY8',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();
        expect( docRef.data().title ).toBe( note.title );
    });

    test('should update url of entry - startUploading', async() => {
        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading( file )  );

        const docRef = await db.doc('/TESTING/journal/notes/WaUUglUQUV6dZa0YboY8').get();
        expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');
    })
    
    
});