import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import SimpleCard from "../components/simple-card";
import GeocodingUtil from "../utilities/geocoding-utils";
import SortingUtils from "../utilities/sorting-utils"
import ComplexCard from "./complex-card";
import {isMobile} from 'react-device-detect';
import hackyApiUtility from "../utilities/hacky-api-utility";
import Sorting from './sorting';


const styles = {
  parentDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  resultsContainer: {
    display: "flex",
    justifyContent: "center",
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
        {isMobile ? <SimpleCard props={hit}/> : <ComplexCard props={hit}/>}
      </li>
    ));
  }

  return <h1>Search for something...</h1>;
};

class SearchResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: {},
    };
    this.sortBy = this.sortBy.bind(this);
  }

  generateDistances(results) {
    if(results && results.length > 0) {
      results.map(result => {
        result.distance = GeocodingUtil.getDistance(result.cLat, result.cLong, this.props.location);
        return result;
      });
      this.setState({results: results});
    }
    else {
      this.setState({results: {}});
    }
  }

  sortBy(field, direction) {
    if (field === "Distance") {
      let sortedArray = SortingUtils.sortByDistance(this.props.results, direction);
      this.setState({results:sortedArray});
    }
    else if (field === "Name") {
      let sortedArray = SortingUtils.sortByName(this.props.results, direction);
      this.setState({results:sortedArray});
    }
    else if (field === "averageRating") {
      let sortedArray = SortingUtils.sortByRating(this.props.results, direction);
      this.setState({results:sortedArray});
    }
  }

  getAverageRatings(results) {
    let self = this;
    if(results && results.length > 0) {
      results.map(result => {
        hackyApiUtility.getAverageRatingForOrg(result.orgId).then(average => {
          results.find(arrayResult => arrayResult.orgId === result.orgId).averageRating = average;
          self.setState({results: results});
        }).catch(rejected => {
          console.log("No data for org" + rejected);
        });
        return result;
      });
    }
  }

  componentDidMount() {
    this.generateDistances(this.props.results);
    this.getAverageRatings(this.props.results);
  }

  componentWillReceiveProps(nextProps, nextContext){
    this.generateDistances(nextProps.results);
    this.getAverageRatings(nextProps.results);
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
        <div style={styles.parentDiv}>
          {this.state.results && this.state.results.length > 0 ? <Sorting sortBy={this.sortBy}/> : null}
          <div style={styles.resultsContainer}>
            {this.getResultList()}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {results: state.results, location:state.user.location};
}

export default connect(mapStateToProps)(SearchResults);
