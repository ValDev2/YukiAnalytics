import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
  return(
    <Route
      {...rest}
      render={props => window.localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to="/login"
        />
      )}
    />
  )
}

export default ProtectedRoute;
