import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./homepage/Homepage";
import Store from "./store/Store";
import MyCart from "./cart/MyCart";
import Admin from "./admin/Admin";
import UserProfile from "./users/UserProfile";
import MyCards from "./mycards/MyCards";
import MyDecks from "./decks/MyDecks";
import NotFound from "./NotFound";

import PrivateRoute from "./PrivateRoute";

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/"><Homepage /></Route>
            <Route exact path="/store"><Store /></Route>
            <Route exact path="/cart"><MyCart /></Route>
            <PrivateRoute exact path="/admin" ><Admin /></PrivateRoute>
            <PrivateRoute exact path="/profile" ><UserProfile /></PrivateRoute>
            <PrivateRoute exact path="/mycards"><MyCards /></PrivateRoute>
            <PrivateRoute exact path="/mydecks"><MyDecks /></PrivateRoute>
            <Route><NotFound /></Route>
        </Switch>
    )
};

export default Routes;