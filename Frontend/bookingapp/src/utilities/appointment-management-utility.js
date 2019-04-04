const AppointmentManager = {
  getPastAppointments: function(appointments) {
    const currentTimeSinceEpoch = new Date().getTime();

    if (appointments) {
      return appointments.filter(function(appointment) {
        return appointment.endTime <= currentTimeSinceEpoch / 1000;
      });
    }

    return null;
  },

  getUpcomingAppointments: function(appointments) {
    const currentTimeSinceEpoch = new Date().getTime();

    if (appointments) {
      return appointments.filter(function(appointment) {
        return appointment.endTime > currentTimeSinceEpoch / 1000;
      });
    }

    return null;
  },

  parseAppointmentDate: function(startTime) {
    let time = new Date(startTime * 1000);
    return time.toLocaleString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  },

  parseAppointmentTime: function(timeSeconds) {
    let time = new Date(timeSeconds * 1000);

    return time.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric"
    });
  }
};

export default AppointmentManager;
