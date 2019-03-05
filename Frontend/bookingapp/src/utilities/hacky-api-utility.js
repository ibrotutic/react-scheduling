import elasticsearchUtility from "./elastic-search-utility";
import axios from "axios";
import { Auth } from "aws-amplify";
import axios from "axios";

const endpointBase = "http://cs309-pp-7.misc.iastate.edu:8080";

export var hackyApiUtility = (function() {
  let hackyApi = {}; // Public object

    var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }

  hackyApi.createOrg = function(orgDetails, admin) {
    elasticsearchUtility.createOrg(orgDetails);
    //our api expects a list...so we send one.
    let employeeList = [];
    employeeList.push(admin);
    hackyApi.addEmployees(employeeList);
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
              username: resp.user.username,
              email: userDetails.email,
              fname: userDetails.fName,
              lname: userDetails.lName
          };

          axios.post(
              "http://cs309-pp-7.misc.iastate.edu:8080/employees",
              person,
              {headers: headers}
          ).then(function (response) {
              callback(payload);
              console.log(response);
          })
              .catch(function (error) {
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
          "http://cs309-pp-7.misc.iastate.edu:8080/employees",
          employees,
          {headers:headers}
      ).then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
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

  hackyApi.createAppointment = function(appointment) {};

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
