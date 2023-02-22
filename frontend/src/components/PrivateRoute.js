import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import UsersApi from "../api/users-api";

function PrivateRoute({ exact, path, children }) {
    const username = localStorage.getItem("username") || false;
    const token = localStorage.getItem("token") || false;
    if (!username || !token) { return <Redirect to="/" />; }

    const check = async () => {
        const userInfo = await UsersApi.currUser(username, token);
        return userInfo.user;
    };

    const loggedIn = check();

    if (!loggedIn) { return <Redirect to="/" />; };

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
};


export default PrivateRoute;
