export const initialUserData = {
  user: {
    email: "",
    username: "",
    userId: "",
    orgs: undefined
  }
};

//Pass in data we get from cognito to query init user data to get userId
export const userReducer = (state = initialUserData, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOAD_USER":
      state = {
        ...state,
        cognito: payload.cognito
      };
      break;
    case "SIGN_OUT_USER":
      state = {
        ...state,
        cognito: null
      };
      break;
    case "LOAD_ORGS":
      state = {
        ...state,
        orgs: payload.orgs
      };
      break;
    case "ADD_ORG":
      var newOrgs = [...state.orgs, payload.org];

      state = {
        ...state,
        orgs: newOrgs
      };
      break;
    default:
      break;
  }
  return state;
};
