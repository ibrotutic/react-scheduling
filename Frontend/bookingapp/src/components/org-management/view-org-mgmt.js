import React, { Component } from "react";
import { Button } from "@material-ui/core";

const OrgField = props => (
  <div style={{ width: "100vw", minHeight: "50px", padding: "10px 0px" }}>
    <div style={{ width: "400px" }}>
      <div style={{ float: "left", fontWeight: "bold" }}>{props.name}</div>
      <div style={{ float: "right" }}>{props.value}</div>
    </div>
  </div>
);

class ViewOrgManagement extends Component {
  state = { org: this.props.org };
  render() {
    console.log(this.state.org);
    const { org } = this.state;

    return (
      <div style={{ overflowX: "hidden", padding: "20px" }}>
        <OrgField name={"Name"} value={org.name} />
        <OrgField name={"Description"} value={org.description} />
        <OrgField name={"Address"} value={org.address} />
        <OrgField name={"Service Type"} value={org.serviceType} />
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.editMode}
        >
          Edit Org
        </Button>
      </div>
    );
  }
}

export default ViewOrgManagement;
