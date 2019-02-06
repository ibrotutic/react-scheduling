import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import NavController from "./pages/nav-controller"

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar />
                <NavController/>
            </div>
        );
    }
}

export default App;
