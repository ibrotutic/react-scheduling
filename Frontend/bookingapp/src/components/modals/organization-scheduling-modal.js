import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EmployeeMenu from "../employee-dropdown";
import Calendar from "react-calendar";
import connect from "react-redux/es/connect/connect";
import LoadingIndicator from "../loading-indicator";
import hackyApiUtility from "../../utilities/hacky-api-utility";
import SelectTime from "../select-time";

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

function ScheduleComponent(props) {
  if (props.props.scheduling) {
    return (
      <div>
        <Typography variant="h5">Select a Date</Typography>
        <Calendar
          value={props.props.date}
          onChange={date => props.props.handleChange("selectedDate", date)}
        />
        <Typography variant="h5">Select a Time</Typography>
        <SelectTime
          onChange={time => props.props.handleChange("selectedTime", time)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={props.props.schedule}
        >
          Make Appointment
        </Button>
      </div>
    );
  } else {
    return <Button onClick={props.props.clickSchedule}>Schedule</Button>;
  }
}

class OrganizationSchedulingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduling: false,
      loading: true,
      employees: {},
      selectedDate: new Date(),
      selectedTime: 0
    };
    this.close = this.props.props.onClick.bind(this);

    this.onClick = this.onClick.bind(this);
    this.clickSchedule = this.clickSchedule.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    hackyApiUtility.getEmployeesForOrg(this.props.orgInfo.orgId, resp => {
      this.setState({ employees: resp });
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

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  scheduleAppointment = () => {
    if (this.state.selectedTime) {
      var date = Math.floor(this.state.selectedDate.getTime() / 1000);

      var appointment = {
        startTime: date + this.state.selectedTime.startTime * 60,
        endTime: date + this.state.selectedTime.endTime * 60
      };

      // Insert appointment
    } else {
      alert("Please select a time slot.");
    }
  };

  render() {
    const { classes } = this.props;

    let calendarProps = {
      clickSchedule: this.clickSchedule,
      scheduling: this.state.scheduling,
      date: this.state.selectedDate,
      handleChange: this.handleChange,
      schedule: this.scheduleAppointment
    };

    let orgInfo = this.props.orgInfo;

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
          {this.state.loading ? (
            <LoadingIndicator />
          ) : (
            <EmployeeMenu employees={this.state.employees} />
          )}
          <Button onClick={this.onClick}>Close</Button>

          <ScheduleComponent props={calendarProps} />
        </div>
      </Modal>
    );
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
