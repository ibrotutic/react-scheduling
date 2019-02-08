export const initialUserData = {
  user: {
    email: "",
    username: "",
    userId: ""
  }
};

//Pass in data we get from cognito to query init user data to get userId
export const userReducer = (state = initialUserData, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOAD_USER":
      state = {
        ...state,
        user: payload.cognito
      };
      break;
    default:
      break;
  }
  return state;
};
