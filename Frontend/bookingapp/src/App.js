import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import NavController from "./pages/nav-controller";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ModalRoot from "./components/modal-root";
import elasticsearchUtility from "./utilities/elastic-search-utility";

Amplify.configure(awsmobile);

class App extends Component {
  componentDidMount() {
    elasticsearchUtility.startClient();
    Auth.currentAuthenticatedUser(user => {
      var payload = {
        cognito: user
      };
      this.props.updateUserData(payload);
    }).catch(err => {
      this.props.clearUserData();
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ModalRoot/>
          <Navbar />
          <NavController />
        </div>
      </BrowserRouter>
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
    },
    clearUserData: () => {
      dispatch({
        type: "SIGN_OUT_USER",
        payload: {}
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
