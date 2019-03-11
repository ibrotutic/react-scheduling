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
  }
};

export default AppointmentManager;
