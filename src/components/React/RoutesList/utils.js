// it's not ease managable and scaling solution
const computeLocalState = (props, state) => {
    const { searchQuery, routes, filters } = props;
    const { prevSearchQuery, prevFilters, prevFilteredRoutes } = state;
    let filteredRoutes;
    // initial case
    if (searchQuery === prevSearchQuery && filters.length === 0) {
        return {...state, prevFilteredRoutes: routes}
    }

    else if (filters.length > prevFilters.length) {
        let r = prevFilteredRoutes.length ? prevFilteredRoutes : routes
        filteredRoutes = r.filter((r, i, a) => {
            const routeTransportType = r[8].toLowerCase();
            const routeTitle = r[10];
            return routeTitle 
                && routeTitle.toLowerCase().includes(searchQuery.toLowerCase()) 
                && filters.includes(routeTransportType);
        })
        return {
            prevFilteredRoutes: filteredRoutes, 
            prevFilters: filters,
            prevSearchQuery: searchQuery
        }
    } else {
        filteredRoutes = routes && routes.filter((r, i, a) => {
            const routeTransportType = r[8].toLowerCase();
            const routeTitle = r[10];
            return routeTitle 
                && routeTitle.toLowerCase().includes(searchQuery.toLowerCase()) 
                && filters.includes(routeTransportType);
        })
        return {
            prevFilteredRoutes: filteredRoutes, 
            prevFilters: filters,
            prevSearchQuery: searchQuery
        }
    }
}

export default computeLocalState;