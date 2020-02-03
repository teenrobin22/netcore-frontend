import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/bootstrap.min.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/users';
import activityReducer from './store/reducers/activities';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ auth: authReducer, user: userReducer, activity: activityReducer });

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = ( <
    Provider store = { store } >
    <
    BrowserRouter >
    <
    App / >
    <
    /BrowserRouter> < /
    Provider >
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();