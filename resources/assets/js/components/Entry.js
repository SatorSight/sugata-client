import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reducer from '../reducers/index';

import thunkMiddleware from 'redux-thunk'

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
);