import { types } from "../../types/types";

describe('Test in Types', () => {

    test('the types should iquals', () => {
        expect( types ).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
            eventSetActive: '[event] Set Active',
            eventLogout : '[event] Event logout',
        
            eventStartAddNew: '[event] Start Add new',
            eventAddNew: '[event] Start Add new',
            eventClearActiveEvent: '[event] Clear Active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded : '[event] Event loaded',
        
            authChecking: '[auth] Checking login state',
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout'
        });
    })
    
})