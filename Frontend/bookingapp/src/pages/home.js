import React, { Component } from "react";
import Background from "../background.jpg";
import Search from "../components/search";
import Icon from "../icon.svg";

var styles = {
  background: {
    backgroundImage: `url(${Background})`,
    flex: "1",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "800px",
    width: "100%",
    textAlign: "center",
    alignItems: "center"
  },
  header: {
    height: "30%"
  },
  logo: {
    minHeight: "200px"
  },
  search: {
    display: "flex",
    justifyContent: "center"
  }
};

class Home extends Component {
  render() {
    return (
      <div style={styles.background}>
        <div>
          <div style={styles.header}>
            <img src={Icon} alt="My logo" style={styles.logo} />
          </div>
          <div style={styles.search}>
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
