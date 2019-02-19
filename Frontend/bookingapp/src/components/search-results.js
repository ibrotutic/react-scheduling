import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import elasticsearchUtility from "../utilities/elastic-search-utility";
import SimpleCard from "../components/simple-card";

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
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            results: []
        };

        elasticsearchUtility.startClient();
    }


    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
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