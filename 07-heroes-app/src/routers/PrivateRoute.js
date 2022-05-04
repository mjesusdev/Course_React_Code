import React from 'react';
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
}