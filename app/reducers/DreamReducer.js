import {
REQUEST_USER_CREATE_DREAM,
CREATE_DREAM_SUCCESS,
DELETE_DREAM_SUCCESS,
EDIT_DREAM_SUCCESS,
POPULATE_DREAM_REQUEST,
POPULATE_DREAM_SUCCESS,
POPULATE_DREAM_FAILURE } from '../actions/DreamActions'

import { LOGIN_USER_SUCCESS } from '../actions/AuthActions'

const InitialState = {
  "items": [],
  "isPopulating": false,
  "shouldPopulate": true //Inital Signin populate
}


export default DreamReducer = (state=InitialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS: //ADD populate dreams on login.
      return {
        ...state,
        shouldPopulate: true
      }
      break
    case POPULATE_DREAM_REQUEST:
      return {
        ...state,
        isPopulating: true
      }
      break
    case POPULATE_DREAM_SUCCESS:
      return {
        ...state,
        items: action.payload.dreams,
        isPopulating: false,
        shouldPopulate: false
      }
      break
    case POPULATE_DREAM_FAILURE:
      return {
        ...state,
        isPopulating: false,
        shouldPopulate: false
      }
      break

    case CREATE_DREAM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload.dream]
      }
      break
    case DELETE_DREAM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(dream => {
          return dream._id !== action.payload.dreamID
        })
      }
      break
    case EDIT_DREAM_SUCCESS:
      return {
        ...state,
        items: state.items.map((dream) =>  {
          if(dream._id  === action.payload.dream._id){
            return action.payload.dream
          }
          else {
            return dream
          }
        })
      }
      break
    default:
      return state
  }
}
