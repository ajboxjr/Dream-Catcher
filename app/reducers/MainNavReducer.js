import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';
import {
  LOGIN_USER_SUCCESS
} from 'actions/AuthActions'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import MainStack from '../../app/navigation/MainStack'

const router = MainStack.router;
mainNavAction = router.getActionForPathAndParams('tab1');

const initialState = router.getStateForAction(NavigationActions.init());

export default mainNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return router.getStateForAction(getActionForPathAndParams('Main'));
      break;
    default:
        const nextState = router.getStateForAction(action, state);
        return nextState || state;
  }


  // Simply return the original `state` if `nextState` is null or undefined.
};
