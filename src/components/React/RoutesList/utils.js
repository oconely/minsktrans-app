export const getCondition = q => /\d/.test(q[0]) ? 'routenum' : 'routename';

export const checkCondition = (route, qeury, filters) => {
    const field = getCondition(qeury);
    const { routetype, transport } = route;
    const isMatchSearchQuery = route[field].toLowerCase().includes(qeury.toLowerCase());
    const isMatchFilters = filters.some(f => [routetype.toLowerCase(), transport].includes(f));
    return isMatchSearchQuery && isMatchFilters;
}