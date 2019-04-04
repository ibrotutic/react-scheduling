import React, { Component } from "react";
import OrgForm from "../org-form";

class EditOrgManagement extends Component {
  state = { org: this.props.org };
  render() {
    return (
      <div>
        <OrgForm
          org={this.props.org}
          edit
          onSuccess={this.props.exitEdit}
          cancel={this.props.exitEdit}
        />
      </div>
    );
  }
}

export default EditOrgManagement;
