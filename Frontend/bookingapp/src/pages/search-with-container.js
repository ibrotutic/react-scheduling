import React from 'react';
import elasticsearchUtility from '../utilities/elastic-search-utility';
import ImgMediaCard from '../components/simple-card';

const Result = ({results}) => {

    if (results && results.length > 0) {
        return results.map( (hit, index) =>
            <li key ={index}>
                <ImgMediaCard
                props = {hit}
                />
            </li>
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
        if (this.searchQuery) {
            this.searchCluster();
        }
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
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ul style = {{ listStyleType: "none" }}>
                        <Result results={results} />
                    </ul>
                </div>
            </div>
        </div>;
    }
}

export default Container