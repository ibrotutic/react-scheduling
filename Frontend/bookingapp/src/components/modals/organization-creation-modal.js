import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import CreateOrg from "../create-org";

const styles = theme => ({
  dailog: {
    width: theme.spacing.unit * 50
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none"
  }
});

class OrganizationCreationModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.props.props.onClick.bind(this);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.close();
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={true}
        onClose={this.onClick}
        maxWidth="lg"
        className={classes.paper}
      >
        <DialogContent>
          <CreateOrg />
          <Button onClick={this.onClick}>Close</Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(OrganizationCreationModal);
