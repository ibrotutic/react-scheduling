import React, { Component } from "react";
import ButtonAppBar from "./button-app-bar";
import NavbarDrawer from "./navbar-drawer";

class Navbar extends Component {
  state = {
    drawer: false
  };

  render() {
    return (
      <div>
        <NavbarDrawer
          show={this.state.drawer}
          close={() => this.setState({ drawer: false })}
        />
        <ButtonAppBar
          menuClick={() => {
            this.setState({ drawer: true });
          }}
        />
      </div>
    );
  }
}

export default Navbar;
