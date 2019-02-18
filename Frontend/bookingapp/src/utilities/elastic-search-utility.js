import elasticsearch from "elasticsearch";

export var elasticsearchUtility = (function() {
  let client; // Private Variable

  let esClient = {}; // public object - returned at end of module

  esClient.startClient = function() {
    client = new elasticsearch.Client({
      host: "10.24.226.19:9200"
    });
  };

  esClient.testClientAvailability = function() {
    client.ping(
      {
        // ping usually has a 3000ms timeout
        requestTimeout: 1000
      },
      function(error) {
        if (error) {
          console.trace("Cluster not available!");
        } else {
          console.log("All is well");
        }
      }
    );
  };

  esClient.searchFor = async function(searchQuery) {
    try {
      const searchString = searchQuery.toString();

      const response = await client.search({
        index: "services",
        body: {
          query: {
            query_string: {
              query: "*" + searchString + "*"
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
      return results.map(hit => {
        let result = {};

        result.name = hit._source.name;
        result.service = hit._source.service;
        result.description = hit._source.description;
        result.orgId = hit._source.ordID;
        result.address = hit._source.address;

        return result;
      });
    }
  };

  esClient.createOrg = function(org) {
    client
      .index({
        index: "services",
        type: "_doc",
        body: org
      })
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  };

  return esClient; // expose externally
})();

export default elasticsearchUtility;
