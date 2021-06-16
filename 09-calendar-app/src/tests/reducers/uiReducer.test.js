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
    
    test('should execute the options of Modal', () => {
        // Execute the first function - uiOpenModal
        const modalOpen = uiOpenModal();
        // Comprobate with the function in uiReducer
        const stateOpen = uiReducer( initState, modalOpen );
        // Result and finish the test
        expect( stateOpen ).toEqual({ modalOpen: true });
        
        // Execute the first function - uiCloseModal
        const modalClose = uiCloseModal();
        // Comprobate with the funciton in uiReducer
        const stateClose = uiReducer( stateOpen, modalClose );
        // Result and finish the test
        expect( stateClose ).toEqual({ modalOpen: false });
    })
    
})
