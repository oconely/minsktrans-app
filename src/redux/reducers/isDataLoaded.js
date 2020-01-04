const isDataLoaded = (state = false, action) => {
    switch (action.type) {
        case "DATA_LOADED":
            return true;
        default:
            return state;
    }
}

export default isDataLoaded;