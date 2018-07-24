import {
  CREATE_DREAM_REQUEST,
  CREATE_DREAM_SUCCESS,
  CREATE_DREAM_FAILURE,
  DELETE_DREAM_SUCCESS,
  EDIT_DREAM_SUCCESS,
  POPULATE_DREAM_REQUEST,
  POPULATE_DREAM_SUCCESS,
  POPULATE_DREAM_FAILURE
} from '../actions/DreamActions'

import {LOGIN_USER_SUCCESS, LOGOUT_USER} from '../actions/AuthActions'

const initialState = {
  "items": [],
  "isPopulating": false,
  "shouldPopulate": false, //Inital Signin/signup populate
}

export default DreamReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        shouldPopulate: true
      }

    case POPULATE_DREAM_REQUEST:
      return {
        ...state,
        isPopulating: true
      }

    case POPULATE_DREAM_SUCCESS:
    console.log('payload dreams',action.payload.dreams);
      return {
        ...state,
        items: action.payload.dreams,
        isPopulating: false,
        shouldPopulate: false
      }

    case POPULATE_DREAM_FAILURE:
      return {
        ...state,
        isPopulating: false,
        shouldPopulate: false
      }

    case CREATE_DREAM_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      }

    case CREATE_DREAM_SUCCESS:
      return {
        ...state,
        items: [
          ...action.payload.dream, ...state.items
        ],
        isAuthenticating: false
      }

    case CREATE_DREAM_FAILURE:
      return {
        ...state,
        isAuthenticating: false
      }

    case DELETE_DREAM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(dream => {
          return dream._id !== action.payload.dreamID
        })
      }

    case EDIT_DREAM_SUCCESS:
      return {
        ...state,
        items: state.items.map((dream) => {
          if (dream._id === action.payload.dream[0]._id) {
            return action.payload.dream[0]
          } else {
            return dream
          }
        })
      }

    case LOGOUT_USER:
      return initialState

    default:
      return state
  }
}
