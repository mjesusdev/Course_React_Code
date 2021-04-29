import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from '../../../08-journal-app/src/routers/PublicRoute';
import { PrivateRoute } from '../../../08-journal-app/src/routers/PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => {
            
            if ( user?.uid ) {
                dispatch( login( user.displayName, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, setChecking ])

    if ( checking ) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch> 
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAutenticated={ isLoggedIn }
                    />
                    
                    <PrivateRoute 
                        exact
                        path="/"
                        component={ JournalScreen }
                        isAutenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />
                    
                </Switch>
            </div>
        </Router>
    )
}
