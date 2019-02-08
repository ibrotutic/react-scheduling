import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ButtonAppBar extends Component {
  state = {};

  getUser = () => {
    Auth.currentAuthenticatedUser()
      .then(resp => {
        this.setState({ user: resp });
        var payload = {
          cognito: resp
        };
        this.props.updateUserData(payload);
      })
      .catch(() => {
        this.setState({ user: null });
        this.props.clearUserData();
      });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.cognito);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={() => {
                this.props.menuClick();
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Booking App
            </Typography>
            {this.props.user.cognito !== null &&
            this.props.user.cognito !== undefined &&
            this.props.user.username !== "" ? (
              <Typography variant="h6">
                {this.props.user.cognito.username}
              </Typography>
            ) : (
              <div>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
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
    clearUserData: () => {
      dispatch({
        type: "SIGN_OUT_USER",
        payload: {}
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ButtonAppBar)
);
