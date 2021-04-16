import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router';

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
                    : ( <Redirect to="/login" />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}