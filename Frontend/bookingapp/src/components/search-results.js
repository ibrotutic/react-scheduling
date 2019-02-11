import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

class SearchResults extends Component {

    render() {
        console.log(this.props.query);
        return (
            <div>
            <h1>Hi + {this.props.query}</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { query: state.searchQuery };
}

export default connect(mapStateToProps)(SearchResults)