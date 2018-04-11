import *  as DreamAPI from 'api/Api';
import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

/* Login User */

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

 export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
 export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
 export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

 /* Signup User */
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

 export function SignupUser(username, password){
   return (dispatch) => {
     dispatch(requestUserSignUp())
     DreamAPI.Signup(username, password).then((response) => {
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

 export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
 export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'
 export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'

 // export function ChangeUserPasswordRequest()
 // export function ChangeUserPasswordFailure()
 // export function ChangeUserPasswordSuccess()

 export function ChangeUserPassword(oldPass, newPass){
   return (dispatch) =>{
     dispatch(ChangeUserPasswordRequest())
     AsyncStorage.getItem('@token').then((token) =>{
       DreamAPI.ChangePassword(oldPass, newPass, token).then((response)=>{
         if(response.message){
           dispatch(changePasswordSuccess())
           console.log(response.success);
           console.log('Password Changed Successfully');
         }
         else{
           dispatch(changePasswordFailure())
         }
       })
     })
   }
 }

 export function logoutUser(){
   return{
     type: LOGOUT_USER
   }
 }
