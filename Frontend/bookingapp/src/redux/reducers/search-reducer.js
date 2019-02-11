export const initialQuery = '';

export const searchReducer = (state = initialQuery, action) => {

    switch (action.type) {
        case "SEARCH":
            return action.value;
        default:
            return state;
    }

};