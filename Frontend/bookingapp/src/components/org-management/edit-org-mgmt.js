import React, { Component } from "react";
import { Button } from "@material-ui/core";

class EditOrgManagement extends Component {
  state = { org: this.props.org };
  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.props.exitEdit}>
          Save Org
        </Button>
      </div>
    );
  }
}

export default EditOrgManagement;
