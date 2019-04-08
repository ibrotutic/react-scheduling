import React, { Component } from "react";
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
