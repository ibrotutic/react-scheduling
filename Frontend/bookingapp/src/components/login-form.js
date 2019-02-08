import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";

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
  button: {}
});

class LoginForm extends Component {
  state = {
    username: "",
    pw: ""
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  loginSubmit = () => {
    Auth.signIn(this.state.username, this.state.pw)
      .then(() => console.log("Signed in"))
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.username);
    console.log(this.state.pw);
    return (
      <Paper>
        <form>
          <TextField
            // type="email" - when we convert to email
            id="outlined-name"
            label="Username"
            className={classes.textField}
            value={this.state.name}
            onChange={e => this.handleChange(e, "username")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="password"
            id="outlined-pw"
            label="Password"
            className={classes.textField}
            value={this.state.name}
            onChange={e => this.handleChange(e, "pw")}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.loginSubmit()}
          >
            Login
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginForm);
