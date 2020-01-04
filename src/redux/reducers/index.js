import { combineReducers } from 'redux';
import isDataLoaded from './isDataLoaded';
import searchQuery from './searchQuery';
import busRoutesAndStops from './busRoutesAndStops';


const minskTransApp = combineReducers({
    isDataLoaded,
    searchQuery,
    busRoutesAndStops    
});

export default minskTransApp;
