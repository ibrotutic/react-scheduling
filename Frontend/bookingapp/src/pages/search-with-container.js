import React from 'react';
import elasticsearchUtility from '../utilities/elastic-search-utility';

const Result = ({results}) => {

    if (results.length > 0) {
        return results.map( (hit, index) =>
            <div key={index}>
                <h1>{hit.name} - {hit.service}</h1>
            </div>
        )
    }

    return <h1>Search for something...</h1>
};

const Search = (props) => {
    const {
        searchQuery,
        onChange,
        search
    } = props;

    return <div>
        <input
            type="text"
            value={searchQuery}
            onChange={onChange}
        />
        <button onClick={search}>Search</button>
    </div>;
};

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            results: []
        };

        elasticsearchUtility.startClient();

        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearchQueryChange(e) {
        this.setState({searchQuery: e.target.value});
        this.searchCluster();
    }

    onSearch() {
        this.searchCluster();
    }

    searchCluster() {
        elasticsearchUtility.searchFor(this.state.searchQuery).then((result) =>{
                let parsedResults = elasticsearchUtility.parseResults(result);
                this.setState({results: parsedResults});
            }
        ).catch(() => {
            console.error("Failed to search cluster");
        });
    }

    render() {
        const {results, searchQuery} = this.state;

        return <div>
            <Search
                searchQuery={searchQuery}
                onChange={this.onSearchQueryChange}
                search={this.onSearch}
            />
            <Result results={results} />
        </div>;
    }
}

export default Container