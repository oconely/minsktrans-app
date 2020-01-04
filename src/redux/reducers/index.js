import { combineReducers } from 'redux';
import isDataLoaded from './isDataLoaded';
import searchQuery from './searchQuery';
import routesAndStops from './routesAndStops';


const minskTransApp = combineReducers({
    isDataLoaded,
    searchQuery,
    routesAndStops    
});

export default minskTransApp;
