import {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { RootStack } from '../../app/navigation/RootNavigator'

const router = RootStack.router;
rootNavActions = router.getActionForPathAndParams('Login');
const initialState = router.getStateForAction(rootNavActions);
console.log(initialState)

export default rootNavReducer = (state = initialState, action) => {
  const nextState = router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
