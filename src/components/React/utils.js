export const toGPS = (bs) => {
    if (!bs) return;
    const tmp = bs.split('');
    tmp.splice(2, 0, '.');
    return parseFloat(tmp.join(''));
};

export const convertCSVtoObjectsArray = (csv, fn) => {
    const lines = csv.split('\n');
    const keys = lines[0].split(';');
    let routes = [];
    lines.slice(1).forEach((l, i) => {
        const values = l.split(';');
        let route = {};
        keys.forEach((k,i) => {
            route[k.toLowerCase().trim()] = values[i];
        });
        // console.log(routes)
        routes.push(route);
    });

    if (fn) {
        return fn(routes);
    }
    return routes;
};


export const mapRouteIdToStops = (routes, stops) => {
    const routesStops = {}
    routes.forEach((route) => {
        routesStops[route.routeid] = [];
        route.routestops.forEach(stopId => {
            routesStops[route.routeid].push(stops.filter(stop => stop.id === stopId)[0])
        });
    });

    return routesStops;
}