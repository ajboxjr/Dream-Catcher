import { combineReducers } from 'redux';
import UserReducer from 'reducers/UserReducer'
import DreamReducer from 'reducers/DreamReducer'
import mainNavReducer from 'reducers/MainNavReducer'
import rootNavReducer from 'reducers/RootNavReducer'

export default combineReducers({
  user: UserReducer,
  dreams: DreamReducer,
  mainNav: mainNavReducer,
  rootNav: rootNavReducer
})
