const filters = (state = [], action) => {
    switch (action.type) {
        case "CHANGE_FILTERS":
            return state.includes(action.filterName.toLowerCase())
                ? state.filter(f => f.toLowerCase() !== action.filterName.toLowerCase())
                : [...state, action.filterName]
        default:
            return state;
    }
}

export default filters;