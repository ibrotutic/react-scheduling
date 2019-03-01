import elasticsearchUtility from "./elastic-search-utility"

export var hackyApiUtlity = (function() {

    hackyApiUtility.createOrg = function (orgDetails) {
        elasticsearchUtility.createOrg(orgDetails);

        //spring stuff to create org
    };

    hackyApiUtility.createUser = function (userDetails) {
        //spring stuff to create user
    };

    hackyApiUtlity.modifyOrg = function (modifiedOrgDetails) {
        //spring and elasticsearch stuff to update org
    };

    hackyApiUtlity.addEmployees = function (employees) {
        //spring shit to add employees
    };

    hackyApiUtility.getEmployeesForOrg = function (orgId) {
        //return list of employees for org
    };

    hackyApiUtlity.removeEmployee = function (employeeId, orgId) {
        //remove an employee from a given orgid
    };

    hackyApiUtility.modifyUser = function (userId) {
        //modify user stuff, (email, name, etc)
    };

    return hackyApiUtlity; // expose externally
})();

export default hackyApiUtlity;