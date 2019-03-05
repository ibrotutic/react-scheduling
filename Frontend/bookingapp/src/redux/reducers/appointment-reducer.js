export const initialApptData = {
  appointments: []
};

export const appointmentReducer = (state = initialApptData, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOAD_APPT":
      state = {
        ...state,
        appointments:
          payload.appointments === undefined ? [] : payload.appointments
      };
      break;
    default:
      break;
  }

  return state;
};
