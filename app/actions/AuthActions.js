import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

import *  as DreamAPI from '../api/Api';

/* Token Login */
export const TOKEN_LOGIN = 'TOKEN_LOGIN'

/* Login User */
export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export function loginUserSuccess(token){
  return {
    type: LOGIN_USER_SUCCESS,
    payload : { _id: jwtDecode(token).username, token: token }
  }
}
export function loginUserFailure(error){
  return {
    type: LOGIN_USER_FAILURE,
    payload: { error }
  }
}
export function requestUserLogin(){
  return {
    type: REQUEST_USER_LOGIN
  }
}

export function LoginUser(username, password){
  return (dispatch) => {
    dispatch(requestUserLogin())
      DreamAPI.Login(username, password).then((response) => {
       if(response.success){
         const token = response.token
         AsyncStorage.setItem('@token', token).then(() =>{
           dispatch(loginUserSuccess(token))
         })
        }
        else{
         dispatch(loginUserFailure(response.err))
       }
      })
    }
  }

  export function TokenLoginUser(){
    console.log('asdfo;asdjf;asdjfasdjf');
    return (dispatch) => {
      AsyncStorage.getItem('@token').then((token) =>{
        if(token){
          dispatch(loginUserSuccess(token))
        }
    })
  }
}
 /* Signup User */

 export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
 export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
 export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

 export function requestUserSignUp(){
   return {
     type: SIGNUP_USER_REQUEST
   }
 }
 export function signUpUserSuccess(token){
   return {
     type: SIGNUP_USER_SUCCESS,
     payload: { _id: jwtDecode(token).username, token: token }
   }
 }
 export function signUpUserFailure(error){
   return {
     type: SIGNUP_USER_FAILURE,
     payload: { error }
   }
 }

 export function SignupUser(username, password, verifyPassword){
   console.log(username,'.....');
   return (dispatch) => {
     console.log('signing up');
     dispatch(requestUserSignUp())
     DreamAPI.Signup(username, password, verifyPassword).then((response) => {
       if(response.success){
         const token = response.token
         AsyncStorage.setItem('@token', token).then(()=>{
           dispatch(signUpUserSuccess(token))
         })
        }
        else {
          dispatch(signUpUserFailure(response.err))
        }
      })
   }
 }
 /* Logout User */
 export const LOGOUT_USER = 'LOGOUT_USER';

 export function LogoutUser(){
   return (dispatch) => {
     AsyncStorage.removeItem('@token').then(() => {
       dispatch({type: LOGOUT_USER})
     })
   }
 }

/* Change Password */
 export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
 export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'
 export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'

 export function changePasswordRequest(){
   return {
     type: CHANGE_PASSWORD_REQUEST,
   }
 }
 export function changePasswordFailure(){
   return {
     type: CHANGE_PASSWORD_FAILURE
   }
 }
 export function changePasswordSuccess(){
   return {
     type: CHANGE_PASSWORD_SUCCESS
   }
 }

 export function ChangeUserPassword(oldPass, newPass){
   return (dispatch) =>{
     dispatch(changePasswordRequest())
     AsyncStorage.getItem('@token').then((token) =>{
       DreamAPI.ChangePassword(oldPass, newPass, token).then((response)=>{
         // console.log(response);
         if(response.success){
           dispatch(changePasswordSuccess())
           console.log(response.success);         }
         else{
           dispatch(changePasswordFailure())
         }
       })
     })
   }
 }

 /* DELETE ACCOUNT !!! */
export const DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST"
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS"
export const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE"

export function deleteAccountRequest(){
  return {
    type: DELETE_ACCOUNT_REQUEST
  }
}
export function deleteAccountSuccess(){
  return {
    type: DELETE_ACCOUNT_SUCCESS
  }
}
export function deleteAccountFailure(error){
  return {
    type: DELETE_ACCOUNT_FAILURE,
    payload: { error: error}
  }
}

export function DeleteUserAccount(oldPass){
  return (dispatch)=> {
    dispatch(deleteAccountRequest())
    AsyncStorage.getItem("@token").then((token)=>{
      DreamAPI.DeleteAccount(oldPass, token).then((response)=>{
        if (response.success){
          dispatch(deleteAccountSuccess());
        }
        else{
          dispatch(deleteAccountFailure(response.err))
        }
      })
    })
  }
}
