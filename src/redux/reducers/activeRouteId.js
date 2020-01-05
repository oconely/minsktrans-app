const activeRouteId = (state = '', action) => {
    switch (action.type) {
        case "CHANGE_ACTIVE_ROUTE":
            return action.id
        default:
            return state;
    }
}

export default activeRouteId;