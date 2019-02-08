import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import NavController from "./pages/nav-controller";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { connect } from "react-redux";

Amplify.configure(awsmobile);

class App extends Component {
  componentDidMount() {
    console.log("mount");
    Auth.currentAuthenticatedUser(user => {
      console.log("logged in app");
      var payload = {
        cognito: user
      };
      this.props.updateUserData(payload);
    }).catch(err => {
      console.log("not auth app");
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <NavController />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cognito: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: userData => {
      dispatch({
        type: "LOAD_USER",
        payload: userData
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
