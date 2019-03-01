import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import SimpleCard from "../components/simple-card";

const styles =  ({
    resultsContainer: {
        display: "flex",
        justifyContent: "center",
        height: "700px",
        overflowY: "scroll"
    }
});


const Result = ({results}) => {

    if (results && results.length > 0) {
        return results.map( (hit) =>
            <li key ={hit.orgId}>
                <SimpleCard
                    props = {hit}
                />
            </li>
        )
    }

    return <h1>Search for something...</h1>
};

class SearchResults extends Component {
    render() {
        return (
            <div>
                <div style={styles.resultsContainer}>
                    <ul style = {{ listStyleType: "none" }}>
                        <Result results={this.props.results}/>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { results: state.results };
}

export default connect(mapStateToProps)(SearchResults)