import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import elasticsearchUtility from "../utilities/elastic-search-utility";
import { Link } from "react-router-dom";

const uuidv4 = require("uuid/v4");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    maxWidth: "400px"
  }
});

class CreateOrg extends Component {
  state = {};

  createOrg = () => {
    var org = {
      orgId: uuidv4(),
      name: this.state.companyName,
      address: this.state.address,
      service: this.state.serviceType,
      description: this.state.description,
      tags: this.state.tags
    };

    elasticsearchUtility.createOrg(org);

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
            <Link to="/">Go home</Link>
          </Paper>
        </div>
      );
    }

    return (
      <div>
        <Paper className={classes.paper}>
          <h2>Create Business?</h2>
          // Name, address, tags, service, description
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

export default withStyles(styles)(CreateOrg);
