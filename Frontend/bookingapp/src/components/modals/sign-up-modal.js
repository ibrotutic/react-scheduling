import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SignUpForm from "../sign-up-form";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

function getModalStyle() {
  return {
    position: `absolute`,
    left: `50%`,
    top: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

class SignUpModal extends Component {
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={true}
        onClose={this.onClick}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <SignUpForm />
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(SignUpModal);
