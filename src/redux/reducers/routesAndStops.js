const intialState = {
    pending: false,
    data: {},
    error: null
}
const routesAndStops = (state = intialState, action) => {
    switch (action.type) {
        case "FETCH_DATA_PENDING":
            return {
                ...state,
                pending: true
            }
        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                pending: false,
                data: action.data
            }
        case "FETCH_DATA_ERROR":
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default routesAndStops;

export const getRoutes = (state, query) => state.data.routes?.data.slice(1, -1).filter((r, i, a) => {
    const routeTitle = r[10]
    return routeTitle && routeTitle.toLowerCase().includes(query.toLowerCase());
});
export const getDataPending = state => state.pending;
export const getDataError = state => state.error;
