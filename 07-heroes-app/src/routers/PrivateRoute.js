import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../auth/authContext';

export const PrivateRoute = ({ children }) => {

    const { user } = useContext(authContext);
    const { pathname, search } = useLocation();
    
    localStorage.setItem('lastPath', pathname + search );
    
    return user.logged
        ? children
        : <Navigate to="/login" />
}

/* import React from 'react';
import PropTypes from 'prop-types';

import { Navigate, Route } from 'react-router-dom';

export const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {

    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route { ...rest } 
            component={ (props) => (
                ( isAutenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Route path="login" render={() => <Navigate to="login" /> } />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
} */