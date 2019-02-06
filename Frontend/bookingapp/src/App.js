import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import NavController from "./pages/nav-controller";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";

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

export default App;
