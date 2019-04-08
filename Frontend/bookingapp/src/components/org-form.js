import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import hackyApiUtility from "../utilities/hacky-api-utility";
import connect from "react-redux/es/connect/connect";
import Grid from "@material-ui/core/Grid";
import Geocode from "react-geocode";

const geocodeApi = "AIzaSyA9QRVSEzwiZHEDUBwbXJrq4SmslBUmGiU";
const uuidv4 = require("uuid/v4");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  paperDiv: {
    width: "70%",
    margin: "auto"
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
    Geocode.setApiKey(geocodeApi);
    
    this.state = {
      success: false,
      address: "",
      address2: "",
      city: "",
      zipCode: "",
      state: "",
      tags: "",
      lat: "",
      long: ""
    };
  }

  componentDidMount() {
    if (this.props.edit) {
      const { org } = this.props;
      console.log(org);
      this.setState({
        org,
        companyName: org.name,
        description: org.description,
        address: org.address,
        address2: org.address2,
        city: org.city,
        state: org.state,
        zipCode: org.zipCode,
        lat: org.clat,
        long: org.clong,
        serviceType: org.serviceType,
        tags: org.tags
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
      address2: this.state.address2,
      zipCode: this.state.zipCode,
      state: this.state.state,
      city: this.state.city,
      serviceType: this.state.serviceType,
      description: this.state.description,
      tags: this.state.tags
    };

    if (this.validateFields(org)) {
      this.geocodeAndCreateOrg(org, admin);
    } else {
      alert("Check your inputs");
    }
  };

  async geocodeAndCreateOrg(org, admin) {
    let address = this.generateAddress(org);
    try {
      let coord = await Geocode.fromAddress(address);
      const { lat, lng } = coord.results[0].geometry.location;
      org.cLat = lat;
      org.cLong = lng;
      hackyApiUtility.createOrg(org, admin);
      this.setState({ success: true });
    } catch {
      alert("Are you sure that address is real?");
    }
  }

  saveOrg = async () => {
    var org = this.state.org;
    org.name = this.state.companyName;
    org.address = this.state.address;
    org.address2 = this.state.address2;
    org.zipCode = this.state.zipCode;
    org.state = this.state.state;
    org.city = this.state.city;
    org.serviceType = this.state.serviceType;
    org.description = this.state.description;
    org.tags = this.state.tags;

    let address = this.generateAddress(org);
    try {
      let coord = await Geocode.fromAddress(address);
      const { lat, lng } = coord.results[0].geometry.location;
      org.cLat = lat;
      org.cLong = lng;

      hackyApiUtility
        .saveOrg(org)
        .then(() => this.props.onSuccess())
        .catch(err => console.log(err));
    } catch {
      alert("Are you sure that address is real?");
    }
  };

  validateFields = org => {
    let validForm = true;
    Object.entries(org).forEach(([key, value]) => {
      if (key !== "address2") {
        if (value === "") {
          validForm = false;
        }
      }
    });
    return validForm;
  };

  generateAddress = org => {
    return org.address + "," + org.city + "," + org.state + "," + org.zipCode;
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
                    type="zipCode"
                    id="outlined-address"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.zipCode || ""}
                    onChange={e => this.handleChange(e, "zipCode")}
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
