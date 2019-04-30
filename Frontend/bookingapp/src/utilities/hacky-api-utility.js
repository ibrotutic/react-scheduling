import elasticsearchUtility from "./elastic-search-utility";
import axios from "axios";
import { Auth } from "aws-amplify";

export const endpointBase = "http://cs309-pp-7.misc.iastate.edu:8080";

export var hackyApiUtility = (function() {
  let hackyApi = {}; // Public object

  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  hackyApi.createOrg = function(orgDetails, admin) {
    elasticsearchUtility.createOrg(orgDetails).then(
      function(response) {
        orgDetails.documentId = response._id;
        hackyApi.createSpringOrg(orgDetails);
      },
      function(error) {
        console.log(error);
        alert(error);
      }
    );
    //our api expects a list...so we send one.
    let employeeList = [];
    employeeList.push(admin);
    hackyApi.addEmployees(employeeList);
  };

  hackyApi.createSpringOrg = function(orgDetails, callback) {
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

  hackyApi.getReviewsForOrg = function(orgId) {
      return new Promise((resolve, reject) => {
        axios
            .get(`${endpointBase}/rating/org?orgId=${orgId}`)
            .then(resp => {
              resolve(resp.data);
            })
            .catch(err => reject(err));
      });
  };

  hackyApi.getAverageRatingForOrg = function(orgId) {
    return new Promise((resolve, reject) => {
      axios
          .get(`${endpointBase}/rating/average?orgId=${orgId}`)
          .then(resp => {
            resolve(resp.data);
          })
          .catch(err => reject(err));
    });
  };

  hackyApi.leaveAReview = function(review) {
    return new Promise((resolve, reject) => {
      axios
        .post(endpointBase + "/rating", review, {
          headers: headers
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
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

  hackyApi.saveOrg = function(modifiedOrgDetails) {
    //spring and elasticsearch stuff to update org
    return new Promise((resolve, reject) => {
      axios
        .post(endpointBase + "/org", modifiedOrgDetails, {
          headers: headers
        })
        .then(function(response) {
          elasticsearchUtility.updateOrg(modifiedOrgDetails);
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
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

  hackyApi.addEmployeeByEmail = function(email, orgId) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          endpointBase + `/employees/org?orgId=${orgId}&email=${email}`,
          {},
          { headers: headers }
        )
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
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

  hackyApi.getPhotosForOrg = function(orgId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${endpointBase}/org/photos?orgId=${orgId}`)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => reject(err));
    });
  };

  hackyApi.addPhoto = function(orgId, url) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${endpointBase}/org/photos?orgId=${orgId}&url=${url}`)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => reject(err));
    });
  };

  hackyApi.deletePhoto = function(orgId, url) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${endpointBase}/org/photos?orgId=${orgId}&url=${url}`)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => reject(err));
    });
  };

  hackyApi.removeEmployee = function(employeeId, orgId) {
    //remove an employee from a given orgid
    return new Promise((resolve, reject) => {
      axios
        .delete(endpointBase + `/employees?empId=${employeeId}&orgId=${orgId}`)
        .then(emp => {
          resolve(emp.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
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

  hackyApi.deleteAppointmentByAppointmentId = function(appointmentId, sender) {
    return new Promise((resolve, reject) => {
      axios
        .delete(endpointBase + "/calendar?id=" + appointmentId + "&sender=" + sender)
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
