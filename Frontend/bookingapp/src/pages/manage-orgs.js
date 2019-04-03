import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewOrgManagement from "../components/org-management/view-org-mgmt";
import ViewOrgEmployees from "../components/org-management/view-org-emp";

class ManageOrgs extends Component {
  state = {
    activeOrg: 0,
    tab: 0
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  getCorrectTab = () => {
    const { tab, activeOrg } = this.state;
    const org = this.props.orgs[activeOrg];

    switch (tab) {
      case 0:
        return <ViewOrgManagement org={org} />;
      case 1:
        return <ViewOrgEmployees org={org} />;
      default:
        return <div>Unknown Tab</div>;
    }
  };

  render() {
    const { orgs } = this.props;
    const { activeOrg, tab } = this.state;

    if (orgs) {
      var org = orgs[activeOrg];
      return (
        <div>
          <h3>{org.name}</h3>
          <Link component="button">Change Selected Org</Link>
          <Paper square>
            <Tabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
            >
              <Tab label="Manage Org" />
              <Tab label="Manage Employees" />
            </Tabs>
          </Paper>
          {this.getCorrectTab()}
        </div>
      );
    } else {
      return <div>Unable to load orgs</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    cognito: state.user.cognito,
    orgs: state.user.orgs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotificationModal: notificationInfo => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: notificationInfo.modalType,
        notificationInfo: notificationInfo.info
      });
    },
    hideModal: () => {
      dispatch({
        type: "HIDE_MODAL"
      });
    },
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
    loadOrgs: orgs => {
      dispatch({
        type: "LOAD_ORGS",
        payload: { orgs: orgs }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageOrgs);
