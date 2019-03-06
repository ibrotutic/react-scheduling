import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import LoginForm from "./login-form";
import hackyApiUtility from "../utilities/hacky-api-utility";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  header: {
    textAlign: "center"
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

class SignUpForm extends Component {
  state = {
    username: "",
    pw: "",
    confirm_pw: "",
    email: "",
    fname: "",
    lname: ""
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  signupSubmit = () => {
    if (this.state.pw === this.state.confirm_pw && this.state.pw !== "") {
      var user = {
        username: this.state.username,
        pw: this.state.pw,
        email: this.state.email,
        fname: this.state.fname,
        lname: this.state.lname
      };

      hackyApiUtility.createUser(user, this.loadUser);
    }
  };

  loadUser = payload => {
    if (payload !== null) {
      this.props.updateUserData(payload);
      this.setState({ signupSuccess: true });
    } else {
      alert("Unable to sign up");
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.signupSuccess) {
      return (
        <Paper className={classes.paper}>
          <h3>
            Congrats! Account Created. Please login and confirm your account.
          </h3>
          <LoginForm />
        </Paper>
      );
    }
    return (
      <div>
        <h2 className={classes.header}>Sign Up</h2>
        <Paper className={classes.paper}>
          <form>
            <TextField
              id="outlined-username"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={e => this.handleChange(e, "username")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="email"
              id="outlined-email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={e => this.handleChange(e, "email")}
              margin="normal"
              variant="outlined"
            />
            <TextField
                type="fname"
                id="outlined-fname"
                label="Your First Name"
                className={classes.textField}
                value={this.state.fname}
                onChange={e => this.handleChange(e, "fname")}
                margin="normal"
                variant="outlined"
            />
            <TextField
                type="lname"
                id="outlined-lname"
                label="Your Last Name"
                className={classes.textField}
                value={this.state.lName}
                onChange={e => this.handleChange(e, "lname")}
                margin="normal"
                variant="outlined"
            />
            <TextField
              type="password"
              id="outlined-pw"
              label="Password"
              className={classes.textField}
              value={this.state.pw}
              onChange={e => this.handleChange(e, "pw")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="password"
              id="outlined-con-pw"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirm_pw}
              onChange={e => this.handleChange(e, "confirm_pw")}
              margin="normal"
              variant="outlined"
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.signupSubmit()}
          >
            Sign Up
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
    updateUserData: userData => {
      dispatch({
        type: "LOAD_USER",
        payload: userData
      });
    },
    createLoginModal: () => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: "LOGIN"
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUpForm)
);
