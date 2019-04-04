import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  header: {
    textAlign: "center"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {},
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

class NotificationModal extends Component {
  state = {};

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
          <h2 className={classes.header}>
            {this.props.notificationInfo.title}
          </h2>
          <Typography>{this.props.notificationInfo.message}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.props.closeModal()}
          >
            Sounds Good!
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    notificationInfo: state.modal.notificationInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch({
        type: "HIDE_MODAL"
      });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationModal)
);
