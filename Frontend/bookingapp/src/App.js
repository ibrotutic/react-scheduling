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
import hackyApiUtility, { endpointBase } from "./utilities/hacky-api-utility";
import SockJsClient from "react-stomp";

Amplify.configure(awsmobile);

class App extends Component {
  componentDidMount() {
    elasticsearchUtility.startClient();
    Auth.currentAuthenticatedUser()
      .then(user => {
        var payload = {
          cognito: user
        };
        this.props.updateUserData(payload);
        hackyApiUtility
          .getOrgsForAdmin(user.attributes.sub)
          .then(orgs => this.props.loadOrgs(orgs.data));
      })
      .catch(err => {
        this.props.clearUserData();
      });
    navigator.geolocation.getCurrentPosition(
        position => {
          this.props.loadLocation(position.coords);
        }
    );
  }

  notify = notification => {
    var info = {
      notificationType: notification.notificationType,
      content: notification.notificationBody
    };
    this.props.showNotificationModal({
      info,
      modalType: "NOTIFICATION"
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ModalRoot />
          <Navbar />
          <NavController />
          <SockJsClient
            url={endpointBase + "/appointment"}
            topics={[
              "/topic/appt",
              "/topic/appt/" +
                (this.props.cognito && this.props.cognito.attributes && this.props.cognito.attributes.sub ? this.props.cognito.attributes.sub : "")
            ]}
            ref={client => {
              this.clientRef = client;
            }}
            onMessage={notification => this.notify(notification)}
          />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    cognito: state.user.cognito
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotificationModal: notificationInfo => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: notificationInfo.modalType,
        notificationInfo: notificationInfo.info
      });
    },
    hideModal: () => {
      dispatch({
        type: "HIDE_MODAL"
      });
    },
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
    },
    loadOrgs: orgs => {
      dispatch({
        type: "LOAD_ORGS",
        payload: { orgs: orgs }
      });
    },
    loadLocation: location => {
      dispatch({
        type: "LOAD_LOCATION",
        payload: location
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);