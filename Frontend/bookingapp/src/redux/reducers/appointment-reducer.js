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
    case "ADD_APPT":
      state = {
        ...state,
        appointments: [...state.appointments, payload.appointment]
      };
      break;
    default:
      break;
  }

  return state;
};
