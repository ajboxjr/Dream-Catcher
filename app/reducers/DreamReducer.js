import {
CREATE_DREAM_SUCCESS,
DELETE_DREAM_SUCCESS,
EDIT_DREAM_SUCCESS,
POPULATE_DREAM_REQUEST,
POPULATE_DREAM_SUCCESS,
POPULATE_DREAM_FAILURE } from 'actions/DreamActions'

const InitialState = {
  "items": [],
  "isPopulating": false
}


export default DreamReducer = (state=InitialState, action) => {
  switch (action.type) {
    case POPULATE_DREAM_REQUEST:
      return {
        ...state,
        isPopulating: true
      }
    case POPULATE_DREAM_SUCCESS:
      return {
        ...state,
        items: action.payload.dreams,
        isPopulating: false
      }
    case POPULATE_DREAM_FAILURE:
      return {
        ...state,
        isPopulating: false
      }
    case CREATE_DREAM_SUCCESS:
      return {
        ...state,
        items: items.unshift(action.payload.dream)
      }
      break
    case DELETE_DREAM_SUCCESS:
      return {
        ...state,
        items: items.filter(dream => {
          return dream._id !== action.payload.dreamID
        })
      }
      break
    case EDIT_DREAM_SUCCESS:
      return {
        ...state,
        items: state.items.map((dream) =>  {
          if(dream._id  === action.payload.dream._id){
            return action.payload.dream
          }
        })
      }
      break
    default:
      return state
  }
}
