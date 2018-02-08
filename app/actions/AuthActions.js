import *  as DreamAPI from 'api/Api';
import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const LOGIN_USER_SUCESS = 'LOGIN_USER_SUCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

/* Login User */

export function loginUserSucess(token){
  return {
    type: LOGIN_USER_SUCESS,
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
       if(response.sucess){
         const token = response.token
         AsyncStorage.setItem('@token', token).then(() =>{
           dispatch(loginUserSucess(token))
         })
        }
        else{
         dispatch(loginUserFailure(response.err))
       }
      })
    }
  }

 export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
 export const SIGNUP_USER_SUCESS = 'SIGNUP_USER_SUCESS';
 export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

 /* Signup User */
 export function requestUserSignUp(){
   return {
     type: SIGNUP_USER_REQUEST
   }
 }

 export function signUpUserSucess(token){
   return {
     type: SIGNUP_USER_SUCESS,
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
       if(response.sucess){
         const token = response.token
         AsyncStorage.setItem('@token', token).then(()=>{
           dispatch(signUpUserSucess(token))
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

 export function logoutUser(){
   return{
     type: LOGOUT_USER
   }
 }
