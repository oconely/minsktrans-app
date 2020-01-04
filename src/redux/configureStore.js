import { createStore } from 'redux'
import minskTransApp from './reducers';

const configureStore = () => {
    const store = createStore(minskTransApp)

    return store;
}

export default configureStore;