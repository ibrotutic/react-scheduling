import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import hackyApiUtility from "../utilities/hacky-api-utility";
import connect from "react-redux/es/connect/connect";
import Grid from "@material-ui/core/Grid";
import OrgForm from "../components/org-form";

const uuidv4 = require("uuid/v4");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  paperDiv: {
    width: "70%"
  },
  header: {
    textAlign: "center"
  },
  textField: {
    width: "100%"
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
  },
  gridPaper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class CreateOrg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      address: "",
      address2: "",
      city: "",
      zipcode: "",
      state: "",
      lat: "",
      long: ""
    };
  }

  createOrg = () => {
    var orgId = uuidv4();

    var adminId = this.props.cognito.cognito.attributes.sub;
    var admin = {
      empId: adminId,
      orgId: orgId,
      status: "admin"
    };

    var org = {
      adminId: adminId,
      orgId: orgId,
      name: this.state.companyName,
      address: this.state.address,
      service: this.state.serviceType,
      description: this.state.description,
      tags: this.state.tags
    };

    hackyApiUtility.createOrg(org, admin);
    this.setState({ success: true });
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
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

    return <OrgForm />;
  }
}

const mapStateToProps = state => {
  return {
    cognito: state.user
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(CreateOrg)
);
