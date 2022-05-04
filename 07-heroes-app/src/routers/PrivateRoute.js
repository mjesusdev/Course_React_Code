import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router';

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
                    : ( <Route path="login" render={() => <Redirect to="login" /> } />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}