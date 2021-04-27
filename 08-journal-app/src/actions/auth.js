import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

// Sign in with Email & Password
export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login(123, 'Peter') );
        }, 3000)
    }
}

// Register User with Email & Password
export const startRegisterUser = ( email, password, name ) => {
    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password)
            .then( async ({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                )
            })

            .catch( error => {
                console.log(error);
            })
    }
}

// Sign in with Google Account
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });
    }
}

// Export
export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})