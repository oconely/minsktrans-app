const isDataLoaded = (state = false, action) => {
    switch (action.type) {
        case "FETCH_DATA_SUCCESS":
            return true;
        default:
            return state;
    }
}

export default isDataLoaded;