export const checkCondition = (route, qeury, filters) => {
    const { routename, routetype, transport } = route;
    const isMatchSearchQuery = routename.toLowerCase().includes(qeury.toLowerCase());
    const isMatchFilters = filters.some(f => [routetype.toLowerCase(), transport].includes(f));
    return isMatchSearchQuery && isMatchFilters;
}