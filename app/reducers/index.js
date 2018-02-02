import { combineReducers } from 'redux';
import UserReducer from 'reducers/UserReducer'
import DreamReducer from 'reducers/DreamReducer'

export default combineReducers({
  user: UserReducer,
  dreams: DreamReducer
})
