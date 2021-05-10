import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Test in ui-actions', () => {
    test('all actions should run', () => {
        const action = setError('help!');

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'help!'
        });

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();
        
        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });
    });
});