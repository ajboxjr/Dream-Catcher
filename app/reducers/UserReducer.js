import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REQUEST_USER_LOGIN,
  LOGOUT_USER,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from 'actions/AuthActions'

//InitialState
//User Id
//
initialState = {
  _id: null,
  isAuthenticating: false,
  token: null,
  error: null
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
        isAuthenticating: false
      }

    case LOGIN_USER_FAILURE:
      return { ...state,
            error: action.payload.error,
            isAuthenticating: false }

    case LOGOUT_USER:
      return initialState

    default:
      return {...state}

  }
}
