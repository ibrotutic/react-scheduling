const AppointmentManager = {
  getPastAppointments: function(appointments) {
    const currentTimeSinceEpoch = new Date().getTime();

    if (appointments) {
      let pastAppointments = appointments.filter(function(appointment) {
        return appointment.endTime >= currentTimeSinceEpoch;
      });

      return pastAppointments;
    }

    return null;
  },

  getUpcomingAppointments: function(appointments) {
    const currentTimeSinceEpoch = new Date().getTime();

    if (appointments) {
      let upcomingAppointments = appointments.filter(function(appointment) {
        return appointment.endTime < currentTimeSinceEpoch;
      });

      return upcomingAppointments;
    }

    return null;
  }
};

export default AppointmentManager;
