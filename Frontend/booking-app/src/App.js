import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div>Booking app body</div>
      </div>
    );
  }
}

export default App;
