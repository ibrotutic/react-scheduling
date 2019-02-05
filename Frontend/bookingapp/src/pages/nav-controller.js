import {Route, Switch} from "react-router-dom";
import Home from "./home";
import Account from "./account";
import Calendar from "./calendar";
import Appointment from "./appointments";
import Settings from "./settings";
import Login from "./login"
import SignUp from "./SignUp"
import React from "react";
import PageNotFound from "./page-not-found";

const NavController = () => (
    <Switch>
        <Route exact path ="/search" component={Home}/>
        <Route exact path ="/account" component={Account}/>
        <Route exact path ="/mycalendar" component={Calendar}/>
        <Route exact path ="/appointments" component={Appointment}/>
        <Route exact path ="/" component={Home}/>
        <Route exact path ="/settings" component={Settings}/>
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/signup" component={SignUp}/>
        <Route component={PageNotFound} />
    </Switch>
)

export default NavController