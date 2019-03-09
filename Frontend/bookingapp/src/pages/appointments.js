import React, { Component } from "react";
import hackyApiUtility from "../utilities/hacky-api-utility";
import { connect } from "react-redux";
import AppointmentCard from "../components/appt-card";

const styles = {
  resultsContainer: {
    display: "flex",
    justifyContent: "center",
    height: "700px",
    overflowY: "scroll"
  }
};

class Appointments extends Component {
  state = {
    userId: "",
    appts: this.props.appointments
  };

  componentDidMount() {
    this.requestAppointments();
  }

  componentDidUpdate() {
    this.requestAppointments();
  }

  requestAppointments = () => {
    if (this.props.cognito && this.state.userId === "") {
      this.setState({ userId: this.props.cognito.attributes.sub });

      if (!this.props.appointments.length) {
        hackyApiUtility.getAppointments(
          this.props.cognito.attributes.sub,
          this.loadAppointments
        );
      }
    }
  };

  loadAppointments = apptList => {
    this.setState({ appts: apptList });

    this.props.loadAppointmentsData({ appointments: apptList });
  };

  getAppointmentsDiv = () => {
    if (this.state.appts && this.state.appts.length !== 0) {
      return this.state.appts.map(appt => {
        return (
          <li key={appt.id} style={{ marginBottom: "10px" }}>
            <AppointmentCard props={appt} />
          </li>
        );
      });
    }
  };

  render() {
    if (!this.props.cognito) {
      return <div>Must be signed in to see your appointments.</div>;
    }
    return (
      <div style={styles.resultsContainer}>
        <ul style={{ listStyleType: "none" }}>{this.getAppointmentsDiv()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.appointment.appointments);
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
