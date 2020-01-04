const isDataLoaded = (state = false, action) => {
    switch (action.type) {
        case "SET_DATA_LOADED":
            return true;
        default:
            return state;
    }
}

export default isDataLoaded;