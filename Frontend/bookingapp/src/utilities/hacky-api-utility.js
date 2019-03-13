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
    console.log(orgDetails);
    hackyApi.createSpringOrg(orgDetails);
  };

  hackyApi.createSpringOrg = function(orgDetails, callback) {
    orgDetails.serviceType = orgDetails.service;
    delete orgDetails.service;
    axios
      .post(endpointBase + "/org", orgDetails, {
        headers: headers
      })
      .then(function(response) {
        console.log("Spring create success:" + response.toString());
      })
      .catch(function(error) {
        console.log("Spring create error:" + error.toString());
      });
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

  hackyApi.getPersonForId = function(personId, callback) {
    axios
      .get(endpointBase + "/person?pid=" + personId)
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
      .then(resp => {
        if (resp.data) {
          callback(resp.data);
        } else {
          callback(null);
        }
      })
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

  hackyApi.getOrgForId = function(orgId, callback) {
    axios
      .get(endpointBase + "/org?orgId=" + orgId)
      .then(resp => {
        callback(resp.data);
      })
      .catch(err => {
        console.log(err);
        var empty = [];
        callback(empty);
      });
  };

  hackyApi.getOrgsForAdmin = function(adminId) {
    return new Promise((resolve, reject) => {
      axios
        .get(endpointBase + "/org/admin?adminId=" + adminId)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return hackyApi; // expose externally
})();

export default hackyApiUtility;
