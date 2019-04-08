import { Route, Switch } from "react-router-dom";
import Home from "./home";
import Account from "./account";
import Calendar from "./calendar";
import Appointment from "./appointments";
import Settings from "./settings";
import Results from "./results";
import Search from "./search";
import React from "react";
import PageNotFound from "./page-not-found";
import ManageOrgs from "./manage-orgs";

const NavController = () => (
  <Switch>
    <Route exact path="/account" component={Account} />
    <Route exact path="/mycalendar" component={Calendar} />
    <Route exact path="/appointments" component={Appointment} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/" component={Home} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/manage-orgs" component={ManageOrgs} />
    <Route path="/results" component={Results} />
    <Route component={PageNotFound} />
  </Switch>
);

export default NavController;
