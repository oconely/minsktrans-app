import { combineReducers } from 'redux';
import isDataLoaded from './isDataLoaded';
import searchQuery from './searchQuery';

const minskTransApp = combineReducers({
    isDataLoaded,
    searchQuery
})

export default minskTransApp;
