import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { types } from '../../types/types';

const middlewars = [thunk];
const mockStore = configureStore(middlewars);

const store = mockStore({
    auth: {
        uid: 'TESTING'
    }
})

describe('Test in notes-action', () => {
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
    });
});