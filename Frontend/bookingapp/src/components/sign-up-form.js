import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";

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

class SignUpForm extends Component {
  state = {
    username: "",
    pw: "",
    confirm_pw: "",
    email: ""
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  signupSubmit = () => {
    console.log(this.state.pw + " " + this.state.confirm_pw);
    if (this.state.pw === this.state.confirm_pw && this.state.pw !== "") {
      Auth.signUp({
        username: this.state.username,
        password: this.state.pw,
        attributes: {
          preferred_username: this.state.email,
          email: this.state.email
        }
      })
        .then(resp => {
          console.log(resp);
          var payload = {
            cognito: resp
          };
          this.props.updateUserData(payload);
          window.location.replace("/");
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <form>
          <TextField
            // type="email" - when we convert to email
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
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUpForm)
);
