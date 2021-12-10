import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect push to='/login' />
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Redirect push to="/" />
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute;