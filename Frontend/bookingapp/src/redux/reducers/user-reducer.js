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
      if (
        payload !== undefined &&
        payload.user !== undefined &&
        payload.user.username !== undefined &&
        payload.user.username !== ""
      ) {
        state = {
          ...state,
          user: payload.user
        };
      }
      break;
    default:
      break;
  }
  return state;
};
