const initialState = {
  modalType: null,
  orgInfo: {},
  notificationInfo: {},
  open: false
};

export function modal(state = initialState, action) {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        modalType: action.modalType,
        orgInfo: action.orgInfo,
        notificationInfo: action.notificationInfo,
        open: true
      };
    case "HIDE_MODAL":
      return initialState;
    default:
      return state;
  }
}
