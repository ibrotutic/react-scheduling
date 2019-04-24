import React, { Component } from "react";
import hackyApiUtility from "../utilities/hacky-api-utility";
import { connect } from "react-redux";
import AppointmentCard from "../components/appt-card";
import AppointmentManager from "../utilities/appointment-management-utility";
import LoadingIndicator from "../components/loading-indicator";
import Button from "@material-ui/core/Button";
import LeaveReview from "../components/leave-review";

const styles = {
  resultsContainer: {
    display: "flex",
    justifyContent: "center",
    height: "700px",
    overflowY: "scroll"
  }
};

class Appointments extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      userId: "",
      appts: this.props.appointments,
      appointmentBeingReviewed: "",
      showUpcoming: true,
      loading: true,
      showPast: false,
      upcomingAppts: [],
      pastAppts: []
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  componentDidMount() {
    this.requestAppointments();
  }

  componentDidUpdate() {
    this.requestAppointments();
  }

  deleteAppointment(appointmentId) {
    hackyApiUtility.deleteAppointmentByAppointmentId(appointmentId).then(() => {
      let appointments = this.state.appts;
      appointments.splice(appointments.findIndex(function(i){
        return i.id === appointmentId;
      }), 1);
      this.setState({appointments:appointments});
      this.filterAppointments(appointments);
    }, error => {
      console.log("Error" + error);
    })
  }

  loadOrg = function(appt) {
    return new Promise(function(resolve, reject) {
      hackyApiUtility.getOrgForId(appt.orgId, resp => {
        if (resp !== undefined) {
          appt.org = resp;
          resolve(resp);
        } else {
          reject("Couldn't Load Org");
        }
      });
    });
  };

  loadEmp = function(appt) {
    return new Promise(function(resolve, reject) {
      hackyApiUtility.getPersonForId(appt.empId, resp => {
        if (resp !== undefined) {
          appt.name = resp;
          resolve(resp);
        } else {
          reject("Couldn't Load Employee");
        }
      });
    });
  };

  loadClient = function(appt) {
    return new Promise(function(resolve, reject) {
      hackyApiUtility.getPersonForId(appt.clientId, resp => {
        if (resp !== undefined) {
          appt.name = resp;
          resolve(resp);
        } else {
          reject("Couldn't Load Client");
        }
      });
    });
  };

  requestAppointments = () => {
    if (this.props.cognito && this.state.userId === "") {
      this.setState({ userId: this.props.cognito.attributes.sub });

      hackyApiUtility.getAppointments(
        this.props.cognito.attributes.sub,
        this.loadAppointments
      );
    }
  };

  toggleFilter = () => {
    this.setState({ showUpcoming: !this.state.showUpcoming });
    this.setState({open: false});
    this.requestAppointments();
  };

  loadAppointments = apptList => {
    let namePromises = this.loadNameData(apptList);
    let orgPromises = this.loadOrgData(apptList);
    Promise.all(namePromises).then(values => {
      apptList.forEach(function(appt, index) {
        delete appt.name;
        appt.name = values[index].fname + " " + values[index].lname;
        return appt;
      });
      Promise.all(orgPromises).then(values => {
        apptList.forEach(function(appt, index) {
          delete appt.org;
          appt.org = values[index];
          return appt;
        });
        this.setState({ appts: apptList });
        this.props.loadAppointmentsData({ appointments: apptList });
        this.filterAppointments(this.state.appts);
        this.setState({ loading: false });
      });
    });
  };

  loadOrgData = appts => {
    return appts.map(appt => {
      return this.loadOrg(appt);
    });
  };

  loadNameData = appts => {
    return appts.map(appt => {
      if (this.state.userId === appt.clientId) {
        return this.loadEmp(appt);
      } else {
        return this.loadClient(appt);
      }
    });
  };

  closeForm = () => {
    this.setState({open: false})
  }

  successfulReview = (appointmentId) => {
    if (appointmentId) {
      let pastAppts = this.state.pastAppts;
      pastAppts.find(appt => appt.id === appointmentId).isReviewed = true;
      this.setState({pastAppts: pastAppts});
    }
  };

  filterAppointments = apptList => {
    let upcomingAppts = AppointmentManager.getUpcomingAppointments(apptList);
    let pastAppts = AppointmentManager.getPastAppointments(apptList);
    this.setState({ upcomingAppts: upcomingAppts });
    this.setState({ pastAppts: pastAppts });
  };

  getAppointmentsToShow = () => {
    if (this.state.showUpcoming) {
      return this.state.upcomingAppts;
    } else {
      return this.state.pastAppts;
    }
  };

  getAppointmentsDiv = () => {
    let appointmentsToShow = this.getAppointmentsToShow();
    if (appointmentsToShow && appointmentsToShow.length !== 0) {
      return appointmentsToShow.map(appt => {
        let props = {appt: appt, deleteAppointment:this.deleteAppointment, clickReview:this.onClickReview};
        return (
          <li key={appt.id} style={{ marginBottom: "10px" }}>
            <AppointmentCard props={props}/>
          </li>
        );
      }, this);
    }
  };

  onClickReview = (appointment) => {
    this.setState({appointmentBeingReviewed: appointment});
    this.setState({open: true});
  };

  render() {

    if (!this.props.cognito) {
      return <div>Must be signed in to see your appointments.</div>;
    } else if (
      this.state.appts &&
      this.state.appts.length === 0 &&
      !this.state.loading
    ) {
      return <h5>No appointments to show.</h5>;
    } else if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <div>
          <LeaveReview props={{open: this.state.open, appointment:this.state.appointmentBeingReviewed, success:this.successfulReview, close:this.closeForm}}/>
          <Button onClick={this.toggleFilter}>
            {!this.state.showUpcoming
              ? "Show future appointments"
              : "Show past appointments"}
          </Button>
          <div style={styles.resultsContainer}>
            <ul style={{ listStyleType: "none" }}>
              {this.getAppointmentsDiv()}
            </ul>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    appointments: state.appointment.appointments,
    cognito: state.user.cognito
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: userData => {
      dispatch({
        type: "LOAD_USER",
        payload: userData
      });
    },
    createLoginModal: () => {
      dispatch({
        type: "SHOW_MODAL",
        modalType: "LOGIN"
      });
    },
    loadAppointmentsData: appointments => {
      dispatch({
        type: "LOAD_APPT",
        payload: appointments
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointments);
