import React, { Component } from "react";
import hackyApiUtility from "../../utilities/hacky-api-utility";
import LoadingIndicator from "../loading-indicator";
import {
  Button,
  Dialog,
  Paper,
  Typography,
  TextField
} from "@material-ui/core";

const EmployeeSection = props => {
  const emp = props.employee;
  const orgId = props.org.orgId;
  console.log(emp);

  return (
    <div>
      <div>{`${emp.fname} ${emp.lname}`}</div>
      <Button
        variant="contained"
        onClick={() => props.removeEmployee(emp, orgId)}
      >
        Delete Employee
      </Button>
    </div>
  );
};

class ViewOrgEmployees extends Component {
  state = {
    org: this.props.org,
    addEmployee: false,
    email: ""
  };

  componentDidMount() {
    hackyApiUtility.getEmployeesForOrg(this.state.org.orgId, resp => {
      this.setState({ employees: resp });
      this.setState({ loading: false });
    });
  }

  getEmployeeSections = () => {
    return this.state.employees.map((emp, index) => (
      <EmployeeSection
        key={index}
        employee={emp}
        org={this.state.org}
        removeEmployee={this.removeEmployee}
      />
    ));
  };

  handleAddEmployee = () => {
    this.setState({ addEmployee: !this.state.addEmployee, email: "" });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  addEmployee = () => {
    hackyApiUtility
      .addEmployeeByEmail(this.state.email, this.state.org.orgId)
      .then(emp => {
        var employees = this.state.employees;

        employees.push(emp);

        this.setState({ employees });
        this.handleAddEmployee();
      })
      .catch(() => alert("Could not add employee"));
  };

  removeEmployee = (emp, orgId) => {
    hackyApiUtility
      .removeEmployee(emp.pId, orgId)
      .then(() => {
        var employees = this.state.employees.filter(
          employee => employee.pId !== emp.pId
        );

        this.setState({ employees });
      })
      .catch(() => alert("Could not delete employee"));
  };

  render() {
    const { employees } = this.state;

    if (!employees) {
      return <LoadingIndicator />;
    }

    return (
      <div>
        <div>{this.getEmployeeSections()}</div>
        <Dialog open={this.state.addEmployee} onClose={this.handleAddEmployee}>
          <Paper>
            <Typography>New Employee's Email</Typography>
            <TextField
              type="email"
              id="outlined-email"
              label="Email"
              // className={classes.textField}
              value={this.state.email}
              onChange={e => this.handleEmailChange(e)}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" onClick={this.addEmployee}>
              Add Employee
            </Button>
            <Button variant="contained" onClick={this.handleAddEmployee}>
              Cancel
            </Button>
          </Paper>
        </Dialog>
        <Button variant="contained" onClick={this.handleAddEmployee}>
          Add Employee
        </Button>
      </div>
    );
  }
}

export default ViewOrgEmployees;
