import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewOrgManagement from "../components/org-management/view-org-mgmt";
import ViewOrgEmployees from "../components/org-management/view-org-emp";
import EditOrgManagement from "../components/org-management/edit-org-mgmt";
import SimpleDialog from "../components/choose-org-dialog";
import ManageGallery from "../components/org-management/manage-gallery";

class ManageOrgs extends Component {
  state = {
    activeOrg: 0,
    tab: 0,
    orgEdit: false,
    empEdit: false,
    chooseOrgActive: false
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  handleChooseOrgMode = () => {
    this.setState({ chooseOrgActive: !this.state.chooseOrgActive });
  };

  handleOrgEditMode = () => {
    this.setState({ orgEdit: !this.state.orgEdit });
  };

  handleEmplEditMode = () => {
    this.setState({ orgEdit: !this.state.empEdit });
  };

  handleChooseOrg = index => {
    this.setState({
      activeOrg: index === 0 ? 0 : index || this.state.activeOrg,
      orgEdit: false
    });
    this.handleChooseOrgMode();
  };

  getCorrectTab = orgs => {
    const { tab, activeOrg } = this.state;
    const org = orgs[activeOrg];

    switch (tab) {
      case 0:
        return this.state.orgEdit ? (
          <EditOrgManagement org={org} exitEdit={this.handleOrgEditMode} />
        ) : (
          <ViewOrgManagement org={org} editMode={this.handleOrgEditMode} />
        );
      case 1:
        return (
          <ViewOrgEmployees org={org} editMode={this.handleEmplEditMode} />
        );
      case 2:
        return <ManageGallery orgId={org.orgId} />;
      default:
        return <div>Unknown Tab</div>;
    }
  };

  render() {
    const { activeOrg, tab } = this.state;
    var orgs = this.props.orgs;

    if (orgs) {
      var org = orgs[activeOrg];

      return (
        <div>
          <h3>{org.name}</h3>
          <Link component="button" onClick={this.handleChooseOrgMode}>
            Change Selected Org
          </Link>
          <SimpleDialog
            orgs={orgs}
            open={this.state.chooseOrgActive}
            onClose={this.handleChooseOrg}
            onCreateNew={() => {
              this.props.showCreateOrgModal();
              this.handleChooseOrg(0);
            }}
          />
          <Paper square>
            <Tabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
            >
              <Tab label="Manage Org" />
              <Tab label="Manage Employees" />
              <Tab label="Manage Gallery" />
            </Tabs>
          </Paper>
          {this.getCorrectTab(orgs)}
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
    showCreateOrgModal: () => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: "ORG_CREATE"
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
