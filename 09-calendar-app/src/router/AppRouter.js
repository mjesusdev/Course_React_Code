import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking } = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Wait...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login"
                        component={ LoginScreen } 
                        isAutenticated={ !!uid }
                    />
                    
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isAutenticated={ !!uid }
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}