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
        <Route exact path ="/Search" component={Home}/>
        <Route exact path ="/Account" component={Account}/>
        <Route exact path ="/My Calendar" component={Calendar}/>
        <Route exact path ="/Appointments" component={Appointment}/>
        <Route exact path ="/" component={Home}/>
        <Route exact path ="/Settings" component={Settings}/>
        <Route exact path ="/Login" component={Login}/>
        <Route exact path ="/SignUp" component={SignUp}/>
        <Route component={PageNotFound} />
    </Switch>
)

export default NavController