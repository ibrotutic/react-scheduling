import elasticsearchUtility from "./elastic-search-utility";
import { Auth } from "aws-amplify";

export var hackyApiUtility = (function() {
  let hackyApi = {}; // Public object

  hackyApi.createOrg = function(orgDetails, admin) {
    elasticsearchUtility.createOrg(orgDetails);
    hackyApi.addEmployees(admin);
  };

  hackyApi.createSpringOrg = function (orgDetails) {

  };

  hackyApi.createUser = function(userDetails, callback) {
    //spring stuff to create user
    Auth.signUp({
      username: userDetails.username,
      password: userDetails.pw,
      attributes: {
        preferred_username: userDetails.email,
        email: userDetails.email
      }
    })
      .then(resp => {
        var payload = {
          cognito: resp
        };

        var person = {
          pId: resp.userSub,
          name: resp.user.username,
          email: userDetails.email
        };

        window
          .fetch("http://cs309-pp-7.misc.iastate.edu:8080/person", {
            method: "POST",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
          })
          .then(resp => resp.json())
          .then(resp => {
            callback(payload);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
        callback(null);
      });
  };

  hackyApi.modifyOrg = function(modifiedOrgDetails) {
    //spring and elasticsearch stuff to update org
  };

  hackyApi.addEmployees = function(employees) {
      window
          .fetch(
              "http://cs309-pp-7.misc.iastate.edu:8080/employees/",
              {
                  method: "POST",
                  mode: "cors",
                  headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(employees)
              }
          )
          .then(resp => resp.json())
          .then(resp => JSON.stringify(resp))
          .catch(err => console.log(err));
  };

  hackyApi.getEmployeesForOrg = function(orgId) {
    //return list of employees for org
  };

  hackyApi.removeEmployee = function(employeeId, orgId) {
    //remove an employee from a given orgid
  };

  hackyApi.modifyUser = function(userId) {
    //modify user stuff, (email, name, etc)
  };

  return hackyApi; // expose externally
})();

export default hackyApiUtility;
