import React, { Component } from "react";
import { Button } from "@material-ui/core";
import OrgForm from "../org-form";

class EditOrgManagement extends Component {
  state = { org: this.props.org };
  render() {
    return (
      <div>
        <OrgForm org={this.props.org} edit cancel={this.props.exitEdit} />
      </div>
    );
  }
}

export default EditOrgManagement;
