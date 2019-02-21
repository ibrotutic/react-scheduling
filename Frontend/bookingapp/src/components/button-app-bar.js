import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import Search from "./search";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  },
  positionLeft: {
    float: "left",
  },
  positionRight: {
    float: "right",
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
            <Search/>
            {this.props.user.cognito !== null &&
            this.props.user.cognito !== undefined &&
            this.props.user.username !== "" ? (
              <Typography variant="h6" color="inherit">
                {this.props.user.cognito.username}
              </Typography>
            ) : (
              <div className={classes.positionRight}>
                <Button color="inherit" onClick={this.props.createLoginModal}>
                  Login
                </Button>
                <Button color="inherit" onClick={this.props.createSignUpModal}>
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
    },
    createLoginModal: () => {
      dispatch({
        type: 'SHOW_MODAL',
        modalType: 'LOGIN'
      })
    },
    createSignUpModal: () => {
      dispatch({
        type: 'SHOW_MODAL',
        modalType: 'SIGN_UP'
      })
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ButtonAppBar)
);
