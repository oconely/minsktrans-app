import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import minskTransApp from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk]
const initialState = {};

const configureStore = () => {
    const store = createStore(
        minskTransApp,
        initialState,
        composeEnhancer(applyMiddleware(...middlewares)),
    );

    return store;
}

export default configureStore;