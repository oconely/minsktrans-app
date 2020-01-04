import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import minskTransApp from './reducers';

const middlewares = [thunk]
const initialState = {};

const configureStore = () => {
    const store = createStore(
        minskTransApp,
        initialState,
        applyMiddleware(...middlewares)
    );

    return store;
}

export default configureStore;