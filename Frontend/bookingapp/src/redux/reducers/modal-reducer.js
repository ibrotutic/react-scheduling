const initialState = {
    modalType: null,
    orgInfo: {},
    open: false
};

export function modal(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                modalType: action.modalType,
                orgInfo: action.orgInfo,
                open: true
            };
        case 'HIDE_MODAL':
            return initialState;
        default:
            return state
    }
};