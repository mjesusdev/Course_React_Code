import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Test in authReducer.js', () => {

    const initState = {
        checking: true
    }

    const otherState = {
        checking: false
    }

    // Test by default
    test('should the state by default', () => {
        const state = authReducer( initState, {} );
        expect( state ).toEqual( initState );
    });

    // Test for authenticate the user 🔐
    test('should authenticate the user 🔐', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Test'
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({ checking: false, uid: '123', name: 'Test'});
    });

    // Test for Logout User ✅ & authCheckingFinish
    test('should logout of the user ✅', () => {
        const state = authReducer( otherState, {} );
        expect( state ).toEqual( otherState );
    });
    

})
