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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import FullStar from 'react-ionicons/lib/MdStar';
import EmptyStar from 'react-ionicons/lib/MdStarOutline';
import ListItem from "@material-ui/core/ListItem"
import {ListItemText} from "@material-ui/core";
import Rating from "react-rating";
import Divider from "@material-ui/core/Divider";

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
    transform: `translate(-50%, -50%)`,
    overflowY: "auto",
    maxHeight: "85vh",
    maxWidth: "95%",
    minWidth: "500px"
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
        <div style={{ float: "left" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ float: "left" }}
            onClick={props.props.schedule}
          >
            Make Appointment
          </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button style={{ float: "right" }} onClick={props.props.hideModal}>
            Cancel
          </Button>
        </div>
      </div>
    );
  } else {
    if (props.props.employeeError) {
      return <h6 style={{ color: "red" }}>Employee error.</h6>;
    }
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
      selectedEmployeeIndex: 0,
      selectedDate: this.getDefaultDate(),
      selectedTime: 0,
      selectedTab: "schedule"
    };
    this.close = this.props.props.onClick.bind(this);

    this.onClick = this.onClick.bind(this);
    this.clickSchedule = this.clickSchedule.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, photosLoading: true, reviewsLoading: true});
    const { orgId } = this.props.orgInfo;

    hackyApiUtility.getEmployeesForOrg(orgId, resp => {
      this.setState({ employees: resp });
      this.setState({ loading: false });
    });

    hackyApiUtility.getPhotosForOrg(orgId).then(urls => {
      this.setState({ urls });
      this.setState({ photosLoading: false });
    });

    hackyApiUtility.getReviewsForOrg(orgId).then(reviews => {
      this.setState({reviews});
      this.setState({reviewsLoading: false});
    })
  }

  onClick() {
    this.setState({ scheduling: false });
    this.close();
  }

  getDefaultDate = () => {
    var date = new Date(Date.now());
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };

  clickSchedule() {
    if (this.state.employees.length > 0 && this.props.cognito) {
      this.setState({ scheduling: true });
    } else if (!this.props.cognito) {
      this.props.createLoginModal();
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  scheduleAppointment = () => {
    if (this.state.selectedTime) {
      let date = Math.floor(this.state.selectedDate.getTime() / 1000);

      if (this.props.cognito) {
        let appointment = {
          clientId: this.props.cognito.attributes.sub,
          empId: this.state.employees[this.state.selectedEmployeeIndex].pId,
          orgId: this.props.orgInfo.orgId,
          startTime: date + this.state.selectedTime.startTime * 60,
          endTime: date + this.state.selectedTime.endTime * 60,
          isReviewed: false
        };

        hackyApiUtility.createAppointment(appointment, resp => {
          if (!resp) {
            alert("Unable to schedule appointment!");
          } else {
            this.props.addAppointment({ appointment: appointment });
            alert("Success");
          }
        });
      } else {
        alert("Please login before attempting to schedule.");
      }
    } else {
      alert("Please select a time slot.");
    }
  };

  getReviews = () => {
    const { reviewsLoading, reviews } = this.state;
    console.log(reviews);

    if (reviewsLoading) {
      return <LoadingIndicator/>
    }
    else if (!reviews || reviews.length === 0) {
      return <h1>No reviews yet</h1>
    }
    else {
      return <List>
        {this.getReviewsList(reviews)}
      </List>
    }

  };

  getReviewsList = (reviews) => {
    return reviews.map(review =>
        (
            <ListItem
                key={review.appointmentId}
                style={{
                  marginBottom: "10px",
                  alignItems:"flex-start"
                }}
            >
              <ListItemText>
                <Typography variant="h5" gutterBottom>
                {review.reviewerName}
                </Typography>
                <Rating
                    emptySymbol={<EmptyStar/>}
                    fullSymbol={<FullStar/>}
                    initialRating={review.rating}
                    readonly
                />
                <Typography variant="body1" gutterBottom>
                  {review.description}
                </Typography>
              </ListItemText>
              <Divider />
            </ListItem>
        ));
  };

  getPhotos = () => {
    const { photosLoading, urls } = this.state;

    if (photosLoading) {
      return <LoadingIndicator />;
    } else {
      return urls.map(url => {
        return (
          <img
            src={url}
            alt=""
            key={url}
            style={{ height: 200, width: 500, marginTop: 15, marginBottom: 15 }}
          />
        );
      });
    }
  };

  getTabSection = calendarProps => {
    const { selectedTab } = this.state;

    switch (selectedTab) {
      case "schedule":
        return (
          <div>
            <EmployeeMenu
              selectedEmployeeIndex={index =>
                this.handleChange("employeeIndex", index)
              }
              employees={this.state.employees}
            />
            <ScheduleComponent props={calendarProps} />
          </div>
        );
      case "gallery":
        return this.getPhotos();
      case "ratings":
        return this.getReviews();
      default:
        return <div>{selectedTab}</div>;
    }
  };

  render() {
    const { classes } = this.props;

    let calendarProps = {
      clickSchedule: this.clickSchedule,
      employeeError: this.state.employees.length === 0 && !this.state.loading,
      scheduling: this.state.scheduling,
      date: this.state.selectedDate,
      handleChange: this.handleChange,
      schedule: this.scheduleAppointment,
      hideModal: this.props.hideModal
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
            <div>
              <Tabs
                value={this.state.selectedTab}
                onChange={(event, value) =>
                  this.setState({ selectedTab: value })
                }
              >
                <Tab label="schedule" value="schedule" />
                <Tab label="gallery" value="gallery" />
                <Tab label="ratings" value="ratings" />
              </Tabs>
              {this.getTabSection(calendarProps)}
            </div>
          )}
          {!this.state.scheduling ? (
            <Button onClick={this.onClick}>Close</Button>
          ) : (
            ""
          )}
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    orgInfo: state.modal.orgInfo,
    cognito: state.user.cognito
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addAppointment: appointment => {
      dispatch({
        type: "ADD_APPT",
        payload: appointment
      });
    },
    createLoginModal: () => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: "LOGIN"
      });
    },
    hideModal: () => {
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
  )(OrganizationSchedulingModal)
);
