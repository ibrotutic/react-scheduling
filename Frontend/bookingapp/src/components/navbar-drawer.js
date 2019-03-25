import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Today from "@material-ui/icons/CalendarTodaySharp";
import Search from "@material-ui/icons/Search";
import Alarm from "@material-ui/icons/Alarm";
import Settings from "@material-ui/icons/Settings";
import Dashboard from "@material-ui/icons/Dashboard";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class NavbarDrawer extends React.Component {
  formatRoute = unformattedRoute => {
    return unformattedRoute.toLowerCase().replace(" ", "");
  };

  showOrgInfo = () => {
    if (
      this.props.cognito &&
      this.props.orgs !== undefined &&
      this.props.orgs.length === 0
    ) {
      return (
        <Button onClick={this.props.createOrgSignUpModal}>
          Own a company? Sign up.
        </Button>
      );
    }
  };

  showOwnedOrgs = () => {
    if (
      this.props.cognito &&
      this.props.orgs !== undefined &&
      this.props.orgs.length !== 0
    ) {
      return (
        <div>
          <Divider />
          <ListItem button key="manage-orgs" component={Link} to="manage-orgs">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Manage my Orgs"} />
          </ListItem>
        </div>
      );
    }
  };

  displaySignOut = () => {
    if (this.props.cognito) {
      return (
        <ListItem
          button
          onClick={() =>
            Auth.signOut().then(() => {
              this.props.clearUserData();
            })
          }
        >
          <ListItemText primary="Sign Out" />
        </ListItem>
      );
    }
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem component={Link} to="/Account" button>
            <ListItemIcon>
              <Avatar>?</Avatar>
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <Divider />
          {["Search", "My Calendar", "Appointments", "Settings"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={this.formatRoute(text)}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <Search />
                  ) : index === 1 ? (
                    <Today />
                  ) : index === 2 ? (
                    <Alarm />
                  ) : (
                    <Settings />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
          {this.showOwnedOrgs()}
          <Divider />
          {this.displaySignOut(this.props.cognito)}
          <Divider />
          {this.showOrgInfo()}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.show} onClose={() => this.props.close()}>
          <div tabIndex={0} role="button" onClick={() => this.props.close()}>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

NavbarDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    cognito: state.user.cognito,
    orgs: state.user.orgs
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
    createOrgSignUpModal: () => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: "ORG_CREATE"
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavbarDrawer)
);
