import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import hackyApiUtility from "../utilities/hacky-api-utility";
import connect from "react-redux/es/connect/connect";
import Grid from "@material-ui/core/Grid";

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

class OrgForm extends Component {
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

  componentDidMount() {
    if (this.props.edit) {
      const { org } = this.props;
      this.setState({
        org,
        companyName: org.name,
        description: org.description,
        address: org.address,
        serviceType: org.serviceType
      });
    }
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
    this.props.addOrg(org);
    this.setState({ success: true });
  };

  saveOrg = () => {
    var org = this.state.org;
    org.name = this.state.companyName;
    org.address = this.state.address;
    org.serviceType = this.state.serviceType;
    org.description = this.state.description;

    hackyApiUtility
      .saveOrg(org)
      .then(() => this.props.onSuccess())
      .catch(err => console.log(err));
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = () => {
    return this.props.edit ? this.saveOrg() : this.createOrg();
  };

  getFormTitle = () => {
    return this.props.edit ? "Edit Org" : "Create a Business";
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
        <h2 className={classes.header}>{this.getFormTitle()}</h2>
        <Paper className={classes.paper}>
          {/* Name, address, tags, service, description */}
          <div className={classes.paperDiv}>
            <form>
              <TextField
                type="text"
                id="name"
                label={"Company Name"}
                className={classes.textField}
                value={this.state.companyName || ""}
                onChange={e => this.handleChange(e, "companyName")}
                margin="normal"
                variant="outlined"
              />
              <Grid container spacing={classes.dense.marginTop}>
                <Grid item xs={12}>
                  <TextField
                    type="address"
                    id="outlined-address"
                    label="Address"
                    className={classes.textField}
                    value={this.state.address || ""}
                    onChange={e => this.handleChange(e, "address")}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="address2"
                    id="outlined-address"
                    label="Address 2"
                    className={classes.textField}
                    value={this.state.address2 || ""}
                    onChange={e => this.handleChange(e, "address2")}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="city"
                    id="outlined-address"
                    label="City"
                    className={classes.textField}
                    value={this.state.city || ""}
                    onChange={e => this.handleChange(e, "city")}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    type="state"
                    id="outlined-address"
                    label="State"
                    className={classes.textField}
                    value={this.state.state || ""}
                    onChange={e => this.handleChange(e, "state")}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    type="zipcode"
                    id="outlined-address"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.zipcode || ""}
                    onChange={e => this.handleChange(e, "zipcode")}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <TextField
                type="text"
                id="outlined-pw"
                label="Service Type"
                className={classes.textField}
                value={this.state.serviceType || ""}
                onChange={e => this.handleChange(e, "serviceType")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="text"
                id="outlined-con-pw"
                label="Tags"
                className={classes.textField}
                value={this.state.tags || ""}
                onChange={e => this.handleChange(e, "tags")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="standard-textarea"
                label="Description"
                multiline
                className={classes.textField}
                value={this.state.description || ""}
                onChange={e => this.handleChange(e, "description")}
                margin="normal"
                variant="outlined"
              />
            </form>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.submitForm()}
          >
            {this.props.edit ? "Save Changes" : "Sign Up"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.props.cancel()}
          >
            Cancel
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

const mapDispatchToProps = dispatch => {
  return {
    addOrg: org => {
      dispatch({
        type: "ADD_ORG",
        payload: {
          org
        }
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrgForm)
);
