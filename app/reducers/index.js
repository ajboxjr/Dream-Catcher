import {combineReducers} from 'redux';
import UserReducer from '../reducers/UserReducer'
import DreamReducer from '../reducers/DreamReducer'
import rootNavReducer from '../reducers/RootNavReducer'

import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist';

/*
 Hydrate store with dreams
*/
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

/*
  Hydrage dreams with items
*/
const dreamPersistConfig = {
  key: 'dreams',
  storage,
  // blacklist: ['isPopulating','shouldPopulate'],
  whitelist: ['items']
}

export const rootReducer = combineReducers({
  user: UserReducer,
  dreams: persistReducer(dreamPersistConfig, DreamReducer),
  rootNav: rootNavReducer
})

export default persistReducer(persistConfig, rootReducer)
