export const modalReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                modalProps: action.orgInfo
            };
        case 'HIDE_MODAL':
            return null;
        default:
            return state;
    }
};