import jwtDecode from 'jwt-decode'
import {AsyncStorage} from 'react-native'

import * as DreamAPI from '../api/Api';
import {LogoutUser} from './AuthActions'
import { parseErrors, parseDreams } from  '../utils/apiUtils'


/*
  Logout User if invalid token
*/
export function verifyToken({errors}) {
  return (dispatch) => {
    if (errors[0]['code'] == "1355" || errors[0]['code' == "1352"]) {
      dispatch(LogoutUser(errors[0].detail));
    }
  }
}

/*
  Populate Dream
*/
export const POPULATE_DREAM_REQUEST = 'POPULATE_DREAM_REQUEST';
export const POPULATE_DREAM_SUCCESS = 'POPULATE_DREAM_SUCCESS';
export const POPULATE_DREAM_FAILURE = 'POPULATE_DREAM_FAILURE';

export function populateDreamRequest() {
  return {type: POPULATE_DREAM_REQUEST}
}

export function populateDreamSuccess(dreams) {
  return {type: POPULATE_DREAM_SUCCESS, payload: {
      dreams
    }}
}

export function populateDreamFailure(error) {
  return {type: POPULATE_DREAM_FAILURE,
          payload: {
            error
          }}
}

//Only way of inputting dreams
export function populateDreams() {
  return(dispatch) => {
    dispatch(populateDreamRequest())
    AsyncStorage.getItem('@token').then((token) => {
      DreamAPI.PopulateDreams(token).then((response) => {
        if (response.errors){
          dispatch(verifyToken(response))
          return dispatch(populateDreamFailure())
        }
        const dreams = response.data.map((dream) => {
          return {
            _id: dream.id,
            title: dream.attributes['title'],
            entry: dream.attributes['entry'],
            author: dream.attributes['author'],
            createdAt: dream.attributes['created-at'],
            tags: dream.attributes['tags'],
            updatedAt: dream.attributes['updated-at']
          }
        })
        dispatch(populateDreamSuccess(dreams))
      }).catch((error) =>
      {
        console.log(error);
        dispatch(populateDreamFailure(error))
      })
    })
  }
}

/*
  Create Dream
*/
export const REQUEST_USER_CREATE_DREAM = "REQUEST_USER_CREATE_DREAM"
export const CREATE_DREAM_SUCCESS = "CREATE_DREAM_SUCCESS"
export const CREATE_DREAM_FAILURE = 'CREATE_DREAM_FAILURE'

export function requestUserCreateDream() {
  return {type: REQUEST_USER_CREATE_DREAM}
}

export function createDreamSuccess(dream) {
  return {type: CREATE_DREAM_SUCCESS, payload: {
      dream
    }}
}

export function createDreamUserFailure(errors) {
  return {type: CREATE_DREAM_FAILURE,
          payload: {errors}
        }
}

export function createDream(title, entry, tags) {
  return(dispatch) => {
    dispatch(requestUserCreateDream())
    AsyncStorage.getItem('@token').then((token) => {
      DreamAPI.AddDream(title, entry, tags, token).then((response) => {
        if (response.errors) {
          dispatch(verifyToken(response))
          return dispatch(createDreamUserFailure(parseErrors(response.errors)))
        }
        console.log('successful???');
        console.log(response.data);
        console.log(parseDreams(response.data));
        dispatch(createDreamSuccess(parseDreams(response.data)))

      })
    })
  }
}

/*
  Delete Dream
*/
export const REQUEST_DELETE_DREAM = 'REQUEST_DELETE_DREAM'
export const DELETE_DREAM_SUCCESS = 'DELETE_DREAM_SUCCESS'
export const DELETE_DREAM_FAILURE = 'DELETE_DREAM_FAILURE'

export function requestDeleteDream() {
  return {type: REQUEST_DELETE_DREAM}
}
export function deleteDreamSuccess(dreamID) {
  return {type: DELETE_DREAM_SUCCESS, payload: {
      dreamID
    }}
}
export function deleteDreamFailure() {
  return {type: DELETE_DREAM_FAILURE}
}

export function deleteDream(dreamID) {
  return(dispatch) => {
    dispatch(requestDeleteDream())
    AsyncStorage.getItem('@token').then((token) => {
      DreamAPI.DeleteDream(dreamID, token).then((response) => {
        if (response.errors) {
          dispatch(verifyToken(response))
          return dispatch(deleteDreamFailure())
        }
        dispatch(deleteDreamSuccess(dreamID))
      })
    })
  }
}

/*
  Edit Dream
*/
export const REQUEST_DREAM_EDIT = "REQUEST_DREAM_EDIT"
export const EDIT_DREAM_SUCCESS = "EDIT_DREAM_SUCCESS"
export const EDIT_DREAM_FAILURE = "EDIT_DREAM_FAILURE"

export function requestDreamEdit() {
  return {type: REQUEST_DREAM_EDIT}
}
export function editDreamSuccess(dream) {
  return {
    type: EDIT_DREAM_SUCCESS,
    payload: {
      dream: dream
    }
  }
}
export function editDreamFailure() {
  return {type: EDIT_DREAM_FAILURE}
}

export function editDream(id, title, entry, tags) {
  return(dispatch) => {
    dispatch(requestDreamEdit)
    AsyncStorage.getItem('@token').then((token) => {
      DreamAPI.EditDream(id, title, entry, tags, token).then((response) => {
        console.log(response);
        if (response.errors) {
          dispatch(verifyToken(response))
          return dispatch(editDreamFailure())
        }
        dispatch(editDreamSuccess(parseDreams(response.data)))

      })
    })
  }
}
