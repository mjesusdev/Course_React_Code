import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router';

export const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {

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