import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REQUEST_USER_LOGIN,
  LOGOUT_USER,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE
} from '../actions/AuthActions'

initialState = {
  _id: null,
  isAuthenticating: false,
  token: null,
  error: null,
  passwordChanged: false,
}

export default UserReducer = (state=initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_REQUEST:
      return { ...state,
        isAuthenticating: true }

    case SIGNUP_USER_SUCCESS:
      return { ...state,
        token:action.payload.token,
        _id: action.payload._id}

    case SIGNUP_USER_FAILURE:
      return { ...state,
        error: action.payload.error,
        isAuthenticating: false }

    case REQUEST_USER_LOGIN:
      return { ...state,
        isAuthenticating: true }

    case LOGIN_USER_SUCCESS:
      return { ...state,
        _id: action.payload._id,
        token: action.payload.token,
        isAuthenticating: false,
        error: null
      }

    case LOGIN_USER_FAILURE:
      return { ...state,
            error: action.payload.error,
            isAuthenticating: false }
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state,
              passwordChanged: true
            }

    case DELETE_ACCOUNT_FAILURE:
      return { ...state,
              error: action.payload.error
        }

    case LOGOUT_USER:
    case DELETE_ACCOUNT_SUCCESS:
      return initialState

    default:
      return {...state}

  }
}
