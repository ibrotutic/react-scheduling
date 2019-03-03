import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import hackyApiUtility from '../utilities/hacky-api-utility'
import connect from "react-redux/es/connect/connect";

const uuidv4 = require("uuid/v4");

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
  constructor(props) {
    super(props);

    this.state = {
      success: false,
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
