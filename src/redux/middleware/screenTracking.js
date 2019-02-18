import { NavigationActions } from 'react-navigation';
import { BackHandler, Platform } from 'react-native';

function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}

handleBackPress = () => {
  return true;
}

const screenTracking = ({ getState }) => next => action => {
  // if (
  //   action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK
  // ) {
  //   return next(action);
  // }

  let navigatorState = getState()
    .get('navigatorState')
    .toJS();

  getActiveRoute(navigatorState);

  const result = next(action);

  navigatorState = getState()
    .get('navigatorState')
    .toJS();

  const nextRoute = getActiveRoute(navigatorState);

  if (
    (nextRoute.routeName === 'EnableNotifications' ||
      nextRoute.routeName === 'SignupComplete') &&
    (action.type === NavigationActions.NAVIGATE ||
      action.type === NavigationActions.BACK) &&
    Platform.OS === 'android'
  ) {
    // console.log('Current Route Name: ');
    // console.log(nextRoute.routeName);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  } else if(nextRoute.routeName !== 'EnableNotifications' &&
    nextRoute.routeName !== 'SignupComplete' &&
    Platform.OS === 'android'
  ) {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  if (
    nextRoute.routeName === 'CustomerActivity' &&
    action.type === NavigationActions.NAVIGATE &&
    nextRoute.params &&
    nextRoute.params.onTabFocus
  ) {
    nextRoute.params.onTabFocus();
  }

  return result;
};

export default screenTracking;
