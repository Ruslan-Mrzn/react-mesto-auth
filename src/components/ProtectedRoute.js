import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({loggedIn, path, children}) => {
  return (
    <Route exact path={path}>
      { //по умолчанию в loggedIn приходит false, поэтому даже если пользователь авторизован, то при перезагрузке страницы он сначала попадает на страницу регистрации
        () => loggedIn ? children : <Redirect to = "./signup" />
      }
    </Route>
  );
};

export default ProtectedRoute;
