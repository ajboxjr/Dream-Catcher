import {StackNavigator, addNavigationHelpers, NavigationActions} from 'react-navigation';

import {createReduxBoundAddListener, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

import {LOGIN_USER_SUCCESS, TOKEN_LOGIN_SUCESS, SIGNUP_USER_SUCCESS, LOGOUT_USER} from '../actions/AuthActions'

import {CREATE_DREAM_SUCCESS, DELETE_DREAM_SUCCESS, REQUEST_DELETE_DREAM} from '../actions/DreamActions'

import {RESET_HOME} from '../actions/NavigationActions'

import {RootStack} from '../../app/navigation/RootNavigator'
import {MainStack} from '../../app/navigation/MainStack'

const router = RootStack.router;

const initialState = router.getStateForAction(NavigationActions.init());

export default rootNavReducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {

    case TOKEN_LOGIN_SUCESS:
    case LOGIN_USER_SUCCESS:
    case SIGNUP_USER_SUCCESS:
      nextState = router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})]
      }), initialState);
      break;

    case CREATE_DREAM_SUCCESS:
      nextState = router.getStateForAction(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({routeName: 'Main'})]
      }), state);
      break;
      
    case DELETE_DREAM_SUCCESS:
    case RESET_HOME:
      nextState = router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'DreamList'})]
      }), state);
      break;

    case LOGOUT_USER:
      nextState = initialState;
      break;

    default:
      nextState = router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
