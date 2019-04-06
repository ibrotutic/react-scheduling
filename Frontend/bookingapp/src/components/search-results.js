import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import SimpleCard from "../components/simple-card";

const styles = {
  resultsContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    overflowY: "scroll"
  },
  list: {
    display: "flex",
    justifyContent: "center",
    paddingInlineStart: "0px",
    listStyleType: "none",
    flexDirection: "column",
    width: "70%"
  }
};

const Result = ({results}) => {
  if (results && results.length > 0) {
    return results.map(hit =>
        (
      <li
        key={hit.orgId}
        style={{
          marginBottom: "10px"
        }}
      >
        <SimpleCard props={hit} />
      </li>
    ));
  }

  return <h1>Search for something...</h1>;
};

class SearchResults extends Component {

  render() {
    return (
      <div style={styles.resultsContainer}>
        <ul style={styles.list}>
          <Result results={this.props.results} />
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {results: state.results};
}

export default connect(mapStateToProps)(SearchResults);
