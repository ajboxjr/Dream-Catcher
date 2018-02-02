import { ADD_DREAM,
DELETE_DREAM,
EDIT_DREAM,
ADD_TAGS,
REMOVE_TAGS,
POPULATE_DREAM_REQUEST,
POPULATE_DREAM_SUCESS,
POPULATE_DREAM_FAILURE } from 'actions/DreamActions'

const InitialState = ["items": {
  _id: ".............",
  title: "title",
  author: "5a63e2c7bc4ccf947b77d33e",
  createDate: "2018-01-21T09:19:57.081Z",
  entry: "Slaked;alskdfj 	",
  lastEdited: "2018-01-21T09:19:57.081Z",
  tags: ["one", "two", "three"]
}]

export default DreamReducer = (state=InitialState, action) => {
  switch (action.type) {
    case POPULATE_DREAM_SUCESS:
      return {
        ...state,
        items: action.payload.dreams
      }
    case ADD_DREAM:
      break
    case DELETE_DREAM:
      break
    case EDIT_DREAM:
      return {
        ...state,
        items: state.items.map((dream) =>  {
          if(dream._id  === action.payload.dream._id){
            return action.payload.dream
          }
        })
      }
      break
    case ADD_TAGS:
      break;
    case REMOVE_TAGS:
      break;
    default:
      return state
  }
}
