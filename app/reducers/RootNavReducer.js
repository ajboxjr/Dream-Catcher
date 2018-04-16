import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';
import {
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  LOGOUT_USER,
  DELETE_ACCOUNT_SUCCESS,
} from '../../app/actions/AuthActions'
import {
  CREATE_DREAM_SUCCESS,
  REQUEST_DELETE_DREAM
} from 'actions/DreamActions'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { RootStack } from '../../app/navigation/RootNavigator'
import {MainStack} from '../../app/navigation/MainStack'


const router = RootStack.router;
// const mainRouter = MainStack.router;
// initialAction = router.getActionForPathAndParams('Login');
const initialState = router.getStateForAction(NavigationActions.init());

export default rootNavReducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      nextState = router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      }), initialState);
        //router.getActionForPathAndParams('Main'));
      break;
    case SIGNUP_USER_SUCCESS:
      nextState = router.getStateForAction(router.getActionForPathAndParams('Main/tab1'), initialState);
      break;
    case CREATE_DREAM_SUCCESS:
      nextState = router.getStateForAction(router.getActionForPathAndParams('Main'), initialState);
      break;
    case REQUEST_DELETE_DREAM:
      nextState = router.getStateForAction(router.getActionForPathAndParams('Main'));
      break;

    case LOGOUT_USER:
    case DELETE_ACCOUNT_SUCCESS:
      nextState = initialState;
      break;

    default:
      nextState = router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
  // Simply return the original `state` if `nextState` is null or undefined.
};
