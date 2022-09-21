import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../auth/authContext';

export const PublicRoute = ({ children }) => {

    const { user } = useContext(authContext);

    return user.logged
        ? <Navigate to="/marvel" />
        : children
}