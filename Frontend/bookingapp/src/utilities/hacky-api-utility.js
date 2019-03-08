import elasticsearchUtility from "./elastic-search-utility";
import axios from "axios";
import { Auth } from "aws-amplify";

const endpointBase = "http://cs309-pp-7.misc.iastate.edu:8080";

export var hackyApiUtility = (function() {
  let hackyApi = {}; // Public object

  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  hackyApi.createOrg = function(orgDetails, admin) {
    elasticsearchUtility.createOrg(orgDetails);
    //our api expects a list...so we send one.
    let employeeList = [];
    employeeList.push(admin);
    hackyApi.addEmployees(employeeList);
  };

  hackyApi.createSpringOrg = function(orgDetails) {};

  hackyApi.createUser = function(userDetails, callback) {
    //spring stuff to create user
    Auth.signUp({
      username: userDetails.username,
      password: userDetails.pw,
      attributes: {
        preferred_username: userDetails.email,
        email: userDetails.email
      }
    }).then(resp => {
      var payload = {
        cognito: resp
      };

      var person = {
        pId: resp.userSub,
        username: resp.user.username,
        email: userDetails.email,
        fname: userDetails.fname,
        lname: userDetails.lname
      };

      axios
        .post(endpointBase + "/person?pid=" + person.pId, person, {
          headers: headers
        })
        .then(function(response) {
          callback(payload);
          console.log(response);
        })
        .catch(function(error) {
          callback(null);
          console.log(error);
        });
    });
  };

  hackyApi.modifyOrg = function(modifiedOrgDetails) {
    //spring and elasticsearch stuff to update org
    };

  hackyApi.addEmployees = function(employees) {
      axios.post(
          endpointBase+ "/employees",
          employees,
          {headers:headers}
      ).then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
  };

  hackyApi.addEmployees = function(employees) {
    axios
      .post(endpointBase + "/employees", employees, { headers: headers })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  hackyApi.getEmployeesForOrg = function(orgId, callback) {
    //return list of employees for org
    axios
      .get(endpointBase + "/employees/org?orgId=" + orgId)
      .then(resp => {
        callback(resp.data);
      })
      .catch(err => {
        console.log(err);
        callback(null);
      });
  };

  hackyApi.removeEmployee = function(employeeId, orgId) {
    //remove an employee from a given orgid
  };

  hackyApi.modifyUser = function(userId) {
    //modify user stuff, (email, name, etc)
  };

  hackyApi.createAppointment = function(appointment, callback) {
    axios
      .post(endpointBase + "/calendar", appointment, { headers: headers })
      .then(resp => callback(resp.data))
      .catch(err => {
        console.log(err);
        callback(null);
      });
  };

  hackyApi.getAppointments = function(userId, callback) {
    axios
      .get(endpointBase + "/calendar?pid=" + userId)
      .then(resp => {
        callback(resp.data);
      })
      .catch(err => {
        console.log(err);

        var empty = [];
        callback(empty);
      });
  };

  return hackyApi; // expose externally
})();

export default hackyApiUtility;
