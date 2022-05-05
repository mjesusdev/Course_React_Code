import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

/* import { AuthContext } from '../auth/authContext'; */
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

    /* const { user } = useContext(AuthContext); */

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } />
                
                <Route path="/*" element={
                    <PrivateRoute
                        /* isAutenticated={ user.logged } */
                    >
                        <DashboardRoutes />
                    </PrivateRoute>
                } />

            </Routes>
        </BrowserRouter>
    )
}
