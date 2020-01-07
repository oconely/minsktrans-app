import { combineReducers } from 'redux';
import isDataLoaded from './isDataLoaded';
import searchQuery from './searchQuery';
import routesAndStops from './routesAndStops';
import filters from './filters';
import testRender from './testRender';
import activeRouteId from './activeRouteId';
import activeRouteTransportType from './activeRouteTransportType';


const minskTransApp = combineReducers({
    isDataLoaded,
    searchQuery,
    routesAndStops,
    filters,
    testRender,
    activeRouteId,  
    activeRouteTransportType
});

export default minskTransApp;
