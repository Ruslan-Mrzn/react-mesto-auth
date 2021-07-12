import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({loggedIn, path, children}) => {
  return (
    <Route path={path}>
      {() =>
        loggedIn ? children : <Redirect to="./signup" />
      }
    </Route>
  );
};

export default ProtectedRoute;
