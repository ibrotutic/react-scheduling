
export const searchReducer = (state = null, action) => {

    switch (action.type) {
        case "SET_RESULT":
            return action.results;
        default:
            return state;
    }

};