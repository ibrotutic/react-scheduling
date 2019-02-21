import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import LoadingIndicator from "./loading-indicator"

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

class LoginForm extends Component {
  state = {
    username: "",
    pw: "",
    confirmCode: "",
    loading: ""
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  loginSubmit = () => {
    this.setState({ loading: true });
    Auth.signIn(this.state.username, this.state.pw)
      .then(resp => {
        var payload = {
          cognito: resp
        };

        this.props.updateUserData(payload);
        this.setState({ loading: false, success:true });
        this.props.closeModal();
      })
      .catch(err => {
        if (err.code === "UserNotConfirmedException") {
          this.setState({ confirmCodeMode: true });
        } else {
          alert("Unable to login, check username and password.");
        }
      });
  };

  confirmCodeSubmit = () => {
    Auth.confirmSignUp(this.state.username, this.state.confirmCode)
      .then(resp => {
        if (resp === "SUCCESS") {
          Auth.signIn(this.state.username, this.state.pw).then(cognito => {
            var payload = {
              cognito: cognito
            };
            this.props.updateUserData(payload);
            this.setState({ success: true });
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    if (this.state.confirmCodeMode) {
      return (
          <div>
            <h2 className={classes.header}>Confirm Code</h2>
            <h3 className={classes.header}>We've sent a confirmation code to your email.</h3>
              <Paper className={classes.paper}>
                <form>
                  <TextField
                    type="password"
                    id="outlined-confirm-code"
                    label="Confirmation Code"
                    className={classes.textField}
                    value={this.state.confirmCode}
                    onChange={e => this.handleChange(e, "confirmCode")}
                    margin="normal"
                    variant="outlined"
                  />
                </form>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.confirmCodeSubmit()}
                >
                  Submit
                </Button>
              </Paper>
          </div>
      );
    } else if (this.state.loading) {
      return (
          <LoadingIndicator/>
          )
    }
    else {
      return (
        <Paper className={classes.paper}>
          <h2 className={classes.header}>Login</h2>
          <form>
            <TextField
              // type="email" - when we convert to email
              id="outlined-name"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={e => this.handleChange(e, "username")}
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
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.loginSubmit()}
          >
            Login
          </Button>
        </Paper>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    cognito: state.user.cognito
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
    closeModal: () => {
      dispatch({
        type: 'HIDE_MODAL',
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
