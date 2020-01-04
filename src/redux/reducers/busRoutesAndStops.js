const intialState = {
    pending: false,
    busRoutesAndStops: {},
    error: null
}
const busRoutesAndStops = (state = intialState, action) => {
    console.log(action)
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
                busRoutesAndStops: action.data
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

export default busRoutesAndStops;

export const getRoutes = state => state.busRoutesAndStops;
export const getDataPending = state => state.pending;
export const getDataError = state => state.error;
