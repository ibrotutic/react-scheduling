import React, { Component } from "react";
import { Button } from "@material-ui/core";

const OrgField = props => (
  <div
    style={{
      minHeight: "50px",
      padding: "10px 0px",
      width: "400px",
      margin: "auto"
    }}
  >
    <div style={{ float: "left", fontWeight: "bold" }}>{props.name}</div>
    <div style={{ float: "right" }}>{props.value}</div>
  </div>
);

class ViewOrgManagement extends Component {
  render() {
    const { org } = this.props;

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
