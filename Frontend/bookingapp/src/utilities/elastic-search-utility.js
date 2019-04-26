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
        result.serviceType = hit._source.serviceType;
        result.description = hit._source.description;
        result.orgId = hit._source.orgId;
        result.address = hit._source.address;
        result.city = hit._source.city;
        result.zipcode = hit._source.zipcode;
        result.state = hit._source.state;
        result.tags = hit._source.tags;
        result.cLat = hit._source.cLat;
        result.cLong = hit._source.cLong;

        return result;
      });
    }
  };

  esClient.createOrg = function(org) {
    return new Promise((resolve, reject) => {
      client
          .index({
            index: "services",
            type: "_doc",
            body: org
          })
          .then(resp => {
            return resolve(resp);
          })
          .catch(err => {
            return reject(err);
          })
    });
  };

  esClient.updateOrg = function(org) {
    return new Promise((resolve, reject) => {
      client
          .index({
            index: "services",
            type: "_doc",
            id: org.documentId,
            body: org
          })
          .then(resp => {
            return resolve(resp);
          })
          .catch(err => {
            return reject(err);
          })
    });
  };

  return esClient; // expose externally
})();

export default elasticsearchUtility;
