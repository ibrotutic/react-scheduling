import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import SimpleCard from "../components/simple-card";
import GeocodingUtil from "../utilities/geocoding-utils"

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
  constructor(props){
    super(props);
    this.state = {
      results: {}
    }
  }

  generateDistances(results) {
    if(results && results.length > 0) {
      results.map(result => {
        result.distance = GeocodingUtil.getDistance(result.cLat, result.cLong, this.props.location);
        return result;
      });
      this.setState({results: results})
    }
  }

  componentWillReceiveProps(nextProps, nextContext){
    this.generateDistances(nextProps.results);
  };

  getResultList() {
    if (this.state.results && this.state.results.length !== 0) {
      return (
          <ul style={styles.list}>
            <Result results={this.state.results} />
          </ul>
      )
    }
  }

  render() {
    return (
      <div style={styles.resultsContainer}>
        {this.getResultList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {results: state.results, location:state.user.location};
}

export default connect(mapStateToProps)(SearchResults);
