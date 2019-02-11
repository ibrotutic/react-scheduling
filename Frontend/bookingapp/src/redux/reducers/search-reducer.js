
export const searchReducer = (state = null, action) => {

    switch (action.type) {
        case "SETRESULT":
            return action.results;
        default:
            return state;
    }

};