import { fetchWithToken, fetchWitoutToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchWitoutToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        
        if ( body.ok ) {
            // Save Token in LocalStorage ✅
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {
        const resp = await fetchWitoutToken('auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            // Save Token in LocalStorage ✅
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( register({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();
        
        if ( body.ok ) {
            // Save Token in LocalStorage ✅
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
        
            dispatch( register({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = ( user ) => ({ 
    type: types.authLogin,
    payload: user
});

const register = ( user ) => ({
    type: types.authStartRegister,
    payload: user
})