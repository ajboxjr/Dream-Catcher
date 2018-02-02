import *  as DreamAPI from 'api/Api';
import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

 export const POPULATE_DREAM_REQUEST = 'POPULATE_DREAM_REQUEST';
 export const POPULATE_DREAM_SUCESS = 'POPULATE_DREAM_SUCESS';
 export const POPULATE_DREAM_FAILURE = 'POPULATE_DREAM_FAILURE';

 export function populateDreamRequest(){
   return{
     type: POPULATE_DREAM_REQUEST
   }
 }

 export function populateDreamSucess(dreams){
   return{
     type: POPULATE_DREAM_SUCESS,
     payload: {dreams}
   }
 }

 export function populateDreamFailure(){
   return{
     type: POPULATE_DREAM_FAILURE
   }
 }


//Only way of inputting dreams
 export function populateDreams(){
   return (dispatch) => {
     dispatch(populateDreamRequest())
     AsyncStorage.getItem('@token').then((token) =>{
       DreamAPI.PopulateDreams(token).then((response) => {
         if(response.sucess){
           const dreams = response.dreams.map((dream) => {
             return {_id: dream._id,
                     title: dream.title,
                     entry: dream.entry,
                     author: dream.author,
                     createDate: dream.createdAt,
                     tags: dream.tags,
                     lastEdited: dream.updatedAt
                   }
           })
           dispatch(populateDreamSucess(dreams))
         }
         else {
           console.log(response.message)
           dispatch(populateDreamFailure())
         }
       })
     })
   }
 }


export const REQUEST_USER_CREATE_DREAM = "REQUEST_USER_CREATE_DREAM"
export const CREATE_DREAM_SUCESS = "CREATE_DREAM_SUCESS"
export const CREATE_DREAM_FAILURE = 'CREATE_DREAM_FAILURE'

 export function requestUserCreateDream(){
   return {
     type: REQUEST_USER_CREATE_DREAM
   }
 }

 export function createDreamSucess(){
   return {
     type: CREATE_DREAM_SUCESS
   }
 }

 export function createDreamUserFailure(){
  return {
    type: CREATE_DREAM_FAILURE
  }
 }

 export function createDream(title, entry, tags){
   return (dispatch) => {
     dispatch(requestUserCreateDream())
     AsyncStorage.getItem('@token').then((token) =>{
       DreamAPI.AddDream(title, entry, tags, token).then((response) => {
         if(response.sucess){
           dispatch(createDreamSucess())
          }
          else {
            dispatch(createDreamUserFailure(response.err))
          }
       })
     })
   }
}

export const REQUEST_DELETE_DREAM = 'REQUEST_DELETE_DREAM'
export const DELETE_DREAM_SUCESS = 'DELETE_DREAM_SUCESS'
export const DELETE_DREAM_FAILURE = 'DELETE_DREAM_FAILURE'

export function requestDeleteDream(){
  return {
    type: REQUEST_DELETE_DREAM
  }
}
export function deleteDreamSucess(){
  return {
    type: DELETE_DREAM_SUCESS
  }
}
export function deleteDreamFailure(){
  return {
    type: DELETE_DREAM_FAILURE
  }
}

export function deleteDream(dreamID){
  return (dispatch) => {
    dispatch(requestDeleteDream())
    AsyncStorage.getItem('@token').then((token)=>{
      DreamAPI.DeleteDream(dreamID, token).then((response)=>{
        if(response.sucess){
          console.log(response.message)
          deleteDreamSucess()
        }
        else{
          deleteDreamFailure()
        }
      })
    })
  }
}

export const REQUEST_DREAM_EDIT = "REQUEST_DREAM_EDIT"
export const EDIT_DREAM_SUCESS = "EDIT_DREAM"
export const EDIT_DREAM_FAILURE = "EDIT_DREAM_FAILURE"

export function requestDreamEdit(){
  return {
    type: REQUEST_DREAM_EDIT
  }
}
export function editDreamSucess(dream){
  return{
    type: EDIT_DREAM_SUCESS,
    payload: {dream}
  }
}
export function editDreamFailure(){
  return{
    type: EDIT_DREAM_FAILURE
  }
}

export function editDream(id, title, entry, tags){
  console.log(id)
  return (dispatch) => {
    dispatch(requestDreamEdit)
    AsyncStorage.getItem('@token').then((token) => {
      DreamAPI.EditDream(id, title, entry, tags, token).then((response) => {
        if (response.sucess){
          dispatch(editDreamSucess(response.dream))
        }
        else{
          dispatch(editDreamFailure())
        }
      })
    })
  }
}
  // export function editUserDream(dreamID, title, entry, tags){
  //   return {
  //     type: EDIT_DREAM,
  //     payload: { dreamID, title, entry, tags }
  //   }
  // }
