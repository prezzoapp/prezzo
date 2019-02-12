import { NavigationActions } from 'react-navigation';

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
    nextRoute.routeName === 'CustomerActivity' &&
    action.type === NavigationActions.NAVIGATE &&
    nextRoute.params &&
    nextRoute.params.onTabFocus
  ) {
    console.log('Current Route: ');
    console.log(nextRoute);
    nextRoute.params.onTabFocus();
  }

  return result;
};

export default screenTracking;
