import *  as DreamAPI from 'api/Api';
import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

import * as AuthActions from 'actions/AuthActions'
import * as DreamActions from 'actions/DreamActions'

export default {...AuthActions, ...DreamActions}

// export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
// export const LOGIN_USER_SUCESS = 'LOGIN_USER_SUCESS';
// export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
//
// /* Login User */
//
// export function loginUserSucess(token){
//   return {
//     type: LOGIN_USER_SUCESS,
//     payload : { _id: jwtDecode(token).username, token: token }
//   }
// }
//
// export function loginUserFailure(error){
//   return {
//     type: LOGIN_USER_FAILURE,
//     payload: { error }
//   }
// }
//
// export function requestUserLogin(){
//   return {
//     type: REQUEST_USER_LOGIN
//   }
// }
//
// export function LoginUser(username, password){
//   return (dispatch) => {
//     dispatch(requestUserLogin())
//       DreamAPI.Login(username, password).then((response) => {
//        if(response.sucess){
//          dispatch(loginUserSucess(response.token))
//        }
//        else {
//          dispatch(loginUserFailure(response.err))
//        }
//        })
//    };
//  };
//
//  export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
//  export const SIGNUP_USER_SUCESS = 'SIGNUP_USER_SUCESS';
//  export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
//
//  /* Signup User */
//  export function requestUserSignUp(){
//    return {
//      type: SIGNUP_USER_REQUEST
//    }
//  }
//
//  export function signUpUserSucess(token){
//    return {
//      type: SIGNUP_USER_SUCESS,
//      payload: { _id: jwtDecode(token).username, token: token }
//    }
//  }
//
//  export function signUpUserFailure(error){
//    return {
//      type: SIGNUP_USER_FAILURE,
//      payload: { error }
//    }
//  }
//
//  export function SignupUser(username, password){
//    return (dispatch) => {
//      dispatch(requestUserSignUp())
//      DreamAPI.Signup(username, password).then((response) => {
//        if(response.sucess){
//             setToken(response.token)
//           dispatch(signUpUserSucess(response.token))
//         }
//         else {
//           dispatch(signUpUserFailure(response.err))
//         }
//       })
//    }
//  }
//  /* Logout User */
//  export const LOGOUT_USER = 'LOGOUT_USER';
//
//  export function logoutUser(){
//    return{
//      type: LOGOUT_USER
//    }
//  }
//
//  //Maybe Later
//  // function setToken(token){
//  //   return AsyncStorage.setItem('@token': token)
//  // }
//
//  /* Dreams */
//
//  export const POPULATE_DREAM_REQUEST = 'POPULATE_DREAM_REQUEST';
//  export const POPULATE_DREAM_SUCESS = 'POPULATE_DREAM_SUCESS';
//  export const POPULATE_DREAM_FAILURE = 'POPULATE_DREAM_FAILURE';
//
//  export function populateDreamRequest(){
//    return{
//      type: POPULATE_DREAM_REQUEST
//    }
//  }
//
//  export function populateDreamSucess(dreams){
//    return{
//      type: POPULATE_DREAM_SUCESS,
//      payload: { dreams }
//    }
//  }
//
//  export function populateDreamFailure(){
//    return{
//      type: POPULATE_DREAM_FAILURE
//    }
//  }
//
//  export function populateDreams(){
//    return (dispatch) => {
//      dispatch(populateDreamRequest())
//      AsyncStorage.getItem('@token').then((token) =>{
//        DreamAPI.PopulateDreams(token).then((response) => {
//          if(response.sucess){
//            const dreams = response.dreams.map((dream) => {
//              return {_id: dream._id,
//                      title: dream.title,
//                      entry: dream.entry,
//                      author: dream.author,
//                      createDate: dream.createdAt,
//                      tags: dream.tags,
//                      lastEdited: dream.updatedAt
//                    }
//            })
//            console.log(dreams)
//            dispatch(populateDreamSucess(dreams))
//          }
//          else {
//            console.log(response.message)
//            dispatch(populateDreamFailure())
//          }
//        })
//      })
//    }
//  }
//
//  export const REQUEST_USER_CREATE_DREAM = "REQUEST_USER_CREATE_DREAM"
//  export const CREATE_DREAM_SUCESS = "CREATE_DREAM_SUCESS"
//  export const CREATE_DREAM_FAILURE = "CREATE_DREAM_FAILURE"
//  export const EDIT_DREAM = "EDIT_DREAM"
//
//
//  export function requestUserCreateDream(){
//    return {
//      type: REQUEST_USER_CREATE_DREAM
//    }
//  }
//
//  export function createDreamSucess(){
//    return {
//      type: CREATE_DREAM_SUCESS
//    }
//  }
//
//  export function createDreamUserFailure(){
//    return {
//      type: CREATE_DREAM_FAILURE
//    }
//  }
//
//   export function addUserDream(){
//     return {
//       type: ADD_DREAM,
//       payload: { title, entry, tags }
//     }
//   }
//
//   // export function deleteUserDream(dreamID, token){
//   //   return (dispatch) => {
//   //     dispatch(requestUserDeleteDream())
//   //     DreamAPI.DeleteDream(dreamID).
//   //   }
//   //     type: DELETE_DREAM,
//   //     payload: { title, entry, tags }
//   //   }
//   // }
//
//   // export function editUserDream(dreamID, title, entry, tags){
//   //   return {
//   //     type: EDIT_DREAM,
//   //     payload: { dreamID, title, entry, tags }
//   //   }
//   // }
//
//   export function createDream(){
//     console.log(token)
//     async (dispatch) => {
//       dispatch(requestUserCreateDream())
//       // AsyncStorage.getItem('@token').then((token) =>{
//         DreamAPI.AddDream(title, entry, tags, token).then((response) => {
//           if(response.sucess){
//             dispatch(createDreamSucess())
//            }
//            else {
//              dispatch(createDreamUserFailure(response.err))
//            }
//        })
//      // })
//    }
//  }
