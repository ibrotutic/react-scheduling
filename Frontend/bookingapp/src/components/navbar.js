import React, { Component } from "react";
import ButtonAppBar from "./button-app-bar";
import NavbarDrawer from "./navbar-drawer";
import { Auth } from "aws-amplify";

class Navbar extends Component {
  state = {
    drawer: false,
    loggedIn: false
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(() => this.setState({ loggedIn: true }))
      .catch(() => this.setState({ loggedIn: false }));
  }

  render() {
    return (
      <div>
        <NavbarDrawer
          show={this.state.drawer}
          close={() => this.setState({ drawer: false })}
        />
        <ButtonAppBar
          userLoggedIn={this.state.loggedIn}
          menuClick={() => {
            this.setState({ drawer: true });
          }}
        />
      </div>
    );
  }
}

export default Navbar;
