import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {
    modalOpen: false
}

describe('Test in uiReducer', () => {

    test('should return state by default', () => { 
        const state = uiReducer( initState, {} );
        expect( state ).toEqual( initState );
    })
    
    test('should return state by default', () => { 
        const modalOpen = uiOpenModal();
        const stateOpen = uiReducer( initState, modalOpen );

        expect( stateOpen ).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer( stateOpen, modalClose );

        expect( stateClose ).toEqual({ modalOpen: false });
    })
    
})
