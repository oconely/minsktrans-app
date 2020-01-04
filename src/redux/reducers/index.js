import { combineReducers } from 'redux';
import isDataLoaded from './isDataLoaded';
import searchQuery from './searchQuery';
import routesAndStops from './routesAndStops';
import filters from './filters';

const minskTransApp = combineReducers({
    isDataLoaded,
    searchQuery,
    routesAndStops,
    filters    
});

export default minskTransApp;
