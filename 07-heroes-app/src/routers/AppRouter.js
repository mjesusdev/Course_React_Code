import React, { useContext } from 'react'
import { Routes } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <Routes> 
                <PublicRoute
                    path="/login"
                    element={ <LoginScreen /> } 
                    isAutenticated={ user.logged }
                />
                
                <PrivateRoute 
                    path="/*"
                    element={ <DashboardRoutes /> }
                    isAutenticated={ user.logged }
                />
            </Routes>
        </div>
    )
}
