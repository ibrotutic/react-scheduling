import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EmployeeMenu from "../employee-dropdown";
import Calendar from "react-calendar";
import connect from "react-redux/es/connect/connect";
import LoadingIndicator from "../loading-indicator";

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

function CalendarComponent(props) {
  if (props.props.scheduling) {
    return <Calendar />;
  } else {
    return <Button onClick={props.props.clickSchedule}>Schedule</Button>;
  }
}

class OrganizationSchedulingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduling: false,
      loading: true
    };
    this.close = this.props.props.onClick.bind(this);

    this.onClick = this.onClick.bind(this);
    this.clickSchedule = this.clickSchedule.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    window
      .fetch(
        "http://localhost:8080/employees?orgId=" + this.props.orgInfo.orgId,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ employees: resp });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  onClick() {
    this.setState({ scheduling: false });
    this.close();
  }

  clickSchedule() {
    this.setState({ scheduling: true });
  }

  render() {
    const { classes } = this.props;

    let calendarProps = {
      clickSchedule: this.clickSchedule,
      scheduling: this.state.scheduling
    };

    let orgInfo = this.props.orgInfo;
    console.log(this.state.employees);
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={true}
          onClose={this.onClick}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="headline" id="modal-title">
              {orgInfo.name}
            </Typography>
            <Typography variant="title" id="simple-modal-description">
              {orgInfo.service}
            </Typography>
            <Typography variant="h5" id="simple-modal-description">
              {orgInfo.address}
            </Typography>
            <Typography variant="body1" id="modal-description">
              {orgInfo.description}
            </Typography>
            <EmployeeMenu employees={this.state.employees} />
            <Button onClick={this.onClick}>Close</Button>
            <CalendarComponent props={calendarProps} />
          </div>
        </Modal>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    orgInfo: state.modal.orgInfo
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(OrganizationSchedulingModal)
);
