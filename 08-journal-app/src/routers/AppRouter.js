import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';

import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PublicRoute } from '../../../08-journal-app/src/routers/PublicRoute';
import { PrivateRoute } from '../../../08-journal-app/src/routers/PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => {
            
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid ) );
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
        return (
            <h1>Wait...</h1>
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
