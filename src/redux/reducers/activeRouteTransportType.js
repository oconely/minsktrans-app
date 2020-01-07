const activeRouteTransportType = (state = '', action) => {
    switch (action.type) {
        case "CHANGE_ACTIVE_ROUTE":
            return action.transportType;
        default:
            return state;
    }
}

export default activeRouteTransportType;