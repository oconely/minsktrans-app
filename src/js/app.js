import React from 'react';
import { render } from 'react-dom';
import AppRoot from '../components/React/AppRoot';
import configureStore from '../redux/configureStore';


export const store = configureStore();
const root = document.getElementById('root');

render(<AppRoot store={store} />, root);