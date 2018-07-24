import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

import * as DreamAPI from '../api/Api'
import {store} from '../store/store'
import {verifyToken} from './DreamActions'
import { parseErrors } from  '../utils/apiUtils'
// TODO: After loading state from user, all api calls getState().user.

/*
  Token Login
*/
export const TOKEN_LOGIN_SUCESS = 'TOKEN_LOGIN_SUCESS'

function tokenLoginUserSuccess(token) {
  return {
    type: TOKEN_LOGIN_SUCESS,
    payload: {
      _id: jwtDecode(token).username,
      token: token
    }
  }
}

export function TokenLoginUser() {
  return(dispatch) => {
    AsyncStorage.getItem('@token').then((token) => {
      if (token) {
        console.log('this is the token', token);
        dispatch(tokenLoginUserSuccess(token))
      }
    })
  }
}

/*
  Login User
*/
export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

function loginUserSuccess(token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      _id: jwtDecode(token).username,
      token: token
    }
  }
}
function loginUserFailure(error) {
  return {type: LOGIN_USER_FAILURE, payload: {
      error
    }}
}
function requestUserLogin() {
  return {type: REQUEST_USER_LOGIN}
}

export function LoginUser(username, password) {
  return(dispatch) => {
    dispatch(requestUserLogin())
    DreamAPI.Login(username, password).then((response) => {
      if(response.errors){
        return dispatch(loginUserFailure(parseErrors(response.errors)))
      }
      console.log(response.data);
      const token = response.data.attributes['access-token']
      AsyncStorage.setItem('@token', token).then(() => {
        dispatch(loginUserSuccess(token))
      })
    })
  }
}

/*
  Signup User
*/
export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

function requestUserSignUp() {
  return {type: SIGNUP_USER_REQUEST}
}
function signUpUserSuccess(token) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: {
      _id: jwtDecode(token).username,
      token: token
    }
  }
}
function signUpUserFailure(error) {
  return {type: SIGNUP_USER_FAILURE, payload: {
      error
    }}
}

export function SignupUser(username, password, verifyPassword) {
  console.log(username, '.....');
  return(dispatch) => {
    console.log('signing up');
    dispatch(requestUserSignUp())
    DreamAPI.Signup(username, password, verifyPassword).then((response) => {
      if (response.errors) {
        //TODO: map errors
        return dispatch(signUpUserFailure(parseErrors(response.errors)))
      }
      const token = response.data.attributes['access-token']
      AsyncStorage.setItem('@token', token).then(() => {
        dispatch(signUpUserSuccess(token))
      })
    })
  }
}

/*
  Logout User
*/
export const LOGOUT_USER = 'LOGOUT_USER';

export function LogoutUser(message="") {
  return(dispatch) => {
    AsyncStorage.removeItem('@token').then(() => {
      dispatch({
        type: LOGOUT_USER,
        payload: {
          error: [message] //Parse string to array
        }
      })
    })
  }
}

/*
  Change Password
*/
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'

function changePasswordRequest() {
  return {type: CHANGE_PASSWORD_REQUEST}
}
function changePasswordFailure(error) {
  return {type: CHANGE_PASSWORD_FAILURE, payload : {error: error}}
}
function changePasswordSuccess() {
  return {type: CHANGE_PASSWORD_SUCCESS}
}

/*
  Change User password. Return promise for outcome.
*/
export function ChangeUserPassword(oldPass, newPass) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(changePasswordRequest())
    AsyncStorage.getItem('@token').then((token) => {
      DreamAPI.ChangePassword(oldPass, newPass, token).then((response) => {
        if (response.errors) {
          dispatch(verifyToken(response))
          dispatch(changePasswordFailure(parseErrors(response.errors)))
          return resolve(false)
        }
        dispatch(changePasswordSuccess())
        resolve(true)
      })
    })
  })
}

/*
  DELETE ACCOUNT !!!
*/
export const DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST"
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS"
export const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE"

function deleteAccountRequest() {
  return {type: DELETE_ACCOUNT_REQUEST}
}
function deleteAccountSuccess() {
  return {type: DELETE_ACCOUNT_SUCCESS}
}
function deleteAccountFailure(error) {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    payload: {
      error: error
    }
  }
}

export function DeleteUserAccount(oldPass) {
  return(dispatch) => {
    dispatch(deleteAccountRequest())
    AsyncStorage.getItem("@token").then((token) => {
      DreamAPI.DeleteAccount(oldPass, token).then((response) => {
        if (response.errors) {
          dispatch(verifyToken(response))
          return dispatch(deleteAccountFailure(parseErrors(response.errors)))
        }
        dispatch(deleteAccountSuccess());
        dispatch(LogoutUser())
      })
    })
  }
}
