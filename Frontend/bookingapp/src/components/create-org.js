import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import elasticsearchUtility from "../utilities/elastic-search-utility";
import { Divider } from "@material-ui/core";

const uuidv4 = require("uuid/v4");
const newEmp = { name: "", id: "", status: "" };

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  header: {
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {},
  paper: {
    margin: "auto",
    maxWidth: "400px",
    textAlign: "center"
  }
});

class CreateOrg extends Component {
  state = {
    employeeList: [newEmp]
  };

  createOrg = () => {
    var orgId = uuidv4();
    var emp = this.collectEmployees(orgId);

    var org = {
      orgId: orgId,
      name: this.state.companyName,
      address: this.state.address,
      service: this.state.serviceType,
      description: this.state.description,
      tags: this.state.tags
    };

    elasticsearchUtility.createOrg(org);
    window
      .fetch(
        "http://cs309-pp-7.misc.iastate.edu:8080/employees?orgId=" + org.orgId,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(emp)
        }
      )
      .then(resp => resp.json())
      .then(resp => JSON.stringify(resp))
      .catch(err => console.log(err));

    this.setState({ success: true });
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  getEmployeeForm = () => {
    return (
      <div>
        {this.state.employeeList.map((emp, index) => {
          return (
            <div key={index}>
              <Divider />
              <TextField
                id={"emp" + index}
                label="Employee Name"
                className={this.props.classes.textField}
                value={this.state.username}
                onChange={e => this.handleChange(e, "emp" + index)}
                margin="normal"
                variant="outlined"
              />
            </div>
          );
        })}
      </div>
    );
  };

  collectEmployees = id => {
    var filledEmp = this.state.employeeList
      .map((emp, index) => {
        var empName = this.state["emp" + index];

        if (empName !== "" && empName !== undefined) {
          return {
            name: empName,
            empId: uuidv4(),
            orgId: id,
            status: ""
          };
        } else {
          return undefined;
        }
      })
      .filter(emp => emp !== undefined);

    return filledEmp;
  };

  addEmployee = () => {
    var empList = this.state.employeeList;
    empList.push(newEmp);

    this.setState({ employeeList: empList });
  };

  render() {
    const classes = this.props.classes;

    if (this.state.success) {
      return (
        <div>
          <Paper>
            <h2>Org Created!</h2>
          </Paper>
        </div>
      );
    }

    return (
      <div>
        <h2 className={classes.header}>Create A Business</h2>
        <Paper className={classes.paper}>
          {/* Name, address, tags, service, description */}
          <form>
            <TextField
              id="username"
              label="Company Name"
              className={classes.textField}
              value={this.state.username}
              onChange={e => this.handleChange(e, "companyName")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="address"
              id="outlined-address"
              label="Address"
              className={classes.textField}
              value={this.state.email}
              onChange={e => this.handleChange(e, "address")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="text"
              id="outlined-pw"
              label="Service Type"
              className={classes.textField}
              value={this.state.pw}
              onChange={e => this.handleChange(e, "serviceType")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="text"
              id="outlined-con-pw"
              label="Tags"
              className={classes.textField}
              value={this.state.confirm_pw}
              onChange={e => this.handleChange(e, "tags")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="standard-textarea"
              label="Description"
              multiline
              className={classes.textField}
              onChange={e => this.handleChange(e, "description")}
              margin="normal"
              variant="outlined"
            />
            {this.getEmployeeForm()}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => this.addEmployee()}
            >
              Add Employee
            </Button>
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.createOrg()}
          >
            Sign Up Company
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CreateOrg);
