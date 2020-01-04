export const setSearchQuery = (query) => ({
    type: "SET_SEARCH_QUERY",
    query
});

export const setDataLoaded = () => ({
    type: "SET_DATA_LOADED",
    isDataLoaded: true
});

export const fetchDataPending = () => ({
    type: "FETCH_DATA_PENDING"
});

export const fetchDataSuccess = (data) => ({
    type: "FETCH_DATA_SUCCESS",
    data
});

export const fetchDataError = (error) => ({
    type: "FETH_DATA_ERROR",
    error
});
