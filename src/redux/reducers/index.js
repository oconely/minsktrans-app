import { combineReducers } from 'redux';
import isDataLoaded from './isDataLoaded';
import searchQuery from './searchQuery';
import routesAndStops from './routesAndStops';
import filters from './filters';
import testRender from './testRender';
import activeRouteId from './activeRouteId';

const minskTransApp = combineReducers({
    isDataLoaded,
    searchQuery,
    routesAndStops,
    filters,
    testRender,
    activeRouteId  
});

export default minskTransApp;
