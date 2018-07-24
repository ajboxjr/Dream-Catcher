import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createReduxBoundAddListener, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

import rootReducer from '../reducers/index';

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/*
  Allow Navigator Reducer
*/
const middleware = createReactNavigationReduxMiddleware("root", state => state.rootNav);

export const addListener = createReduxBoundAddListener("root");

const logger = createLogger({
  predicate: (getState, action) => __DEV__
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger, middleware),);

export const persistor = persistStore(store)
