// @flow
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
  createDidUpdateCallback
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

export {
  middleware,
  addListener
};
