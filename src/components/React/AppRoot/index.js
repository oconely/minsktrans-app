import React from 'react';
import { Provider } from 'react-redux';
import MinskTransApp from '../MinskTransApp';


const AppRoot = ({ store }) => (
    <Provider store={ store }>
        <MinskTransApp />
    </Provider>
);

export default AppRoot;