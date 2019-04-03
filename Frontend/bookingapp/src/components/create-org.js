import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import connect from "react-redux/es/connect/connect";
import OrgForm from "../components/org-form";

class CreateOrg extends Component {
  render() {
    return <OrgForm cancel={this.props.hideModal} />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch({
        type: "HIDE_MODAL"
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateOrg);
