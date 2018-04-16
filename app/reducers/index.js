import { combineReducers } from 'redux';
import UserReducer from 'reducers/UserReducer'
import DreamReducer from 'reducers/DreamReducer'
import rootNavReducer from 'reducers/RootNavReducer'

export default combineReducers({
  user: UserReducer,
  dreams: DreamReducer,
  rootNav: rootNavReducer
})
