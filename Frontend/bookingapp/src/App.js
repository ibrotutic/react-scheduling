import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import NavController from "./pages/nav-controller";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsmobile);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <NavController />
      </div>
    );
  }
}

export default withAuthenticator(App);
