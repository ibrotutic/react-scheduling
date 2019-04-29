import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import AppointmentManager from "../../utilities/appointment-management-utility";
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

  displayNotificaitonInformation = () => {
    switch(this.props.notificationInfo.notificationType) {
      case "CREATE_APPOINTMENT":
        return (
            <div style={{textAlign: "center"}}>
              <h2>
                New Appointment
              </h2>
              <Typography>You have a new appointment on {AppointmentManager.parseAppointmentDate(this.props.notificationInfo.content.startTime)}</Typography>
              <p></p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.closeModal()}>
                Sounds Good!
              </Button>
            </div>
        );
      case "CANCEL_APPOINTMENT":
        return (
            <div style={{textAlign: "center"}}>
              <h2>
                Appointment Cancellation
              </h2>
              <Typography>Your appointment on {AppointmentManager.parseAppointmentDate(this.props.notificationInfo.content.startTime)} was cancelled.</Typography>
              <p></p>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.closeModal()}>
                Ok
              </Button>
            </div>
        );
      case "ADD_EMPLOYEE":
        return (
            <div style={{textAlign: "center"}}>
              <h2>
                New Job!
              </h2>
              <Typography>You have been added as an employee!</Typography>
              <p></p>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.closeModal()}>
                Ok
              </Button>
            </div>
        );
      case "REMOVE_EMPLOYEE":
        return (
            <div style={{textAlign: "center"}}>
              <h2>
                Removed from Organization
              </h2>
              <Typography>You are no longer an employee.</Typography>
              <p></p>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.closeModal()}>
                Ok
              </Button>
            </div>
        );
      default:
        return null;
    }
  };

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
          {this.displayNotificaitonInformation()}
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
