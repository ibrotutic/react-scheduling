import elasticsearch from 'elasticsearch';

export var elasticsearchUtility = (function () {
    let client; // Private Variable

    let esClient = {};// public object - returned at end of module

    esClient.startClient = function () {
        client  = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
        });
    };

    esClient.testClientAvailability = function() {
        client.ping({
            // ping usually has a 3000ms timeout
            requestTimeout: 1000
        }, function (error) {
            if (error) {
                console.trace('Cluster not available!');
            } else {
                console.log('All is well');
            }
        });
    };

    esClient.searchFor = async function (searchQuery) {
        try {
            const searchString = searchQuery.toString();

            const response = await client.search({
                index: 'service',
                body: {
                    query: {
                        query_string: {
                            query: "*"+searchString+"*"
                        }
                    }
                }
            });

            return response.hits.hits;
        } catch (error) {
            console.trace(error.message);
        }
    };

    esClient.parseResults = function(results) {
        if (results.length > 0) {

            return results.map( (hit) => {
                let result = {};

                result.service = hit._source.service;

                if (hit._source.name != null) {
                    result.name = hit._source.name;
                }
                else {
                    result.name = hit._source.user;
                }
                return result;
            });
        }
    };

    return esClient; // expose externally
}());

export default elasticsearchUtility;