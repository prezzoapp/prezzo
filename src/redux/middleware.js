import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware';
import screenTracking from './middleware/screenTracking';

// define store middlewares as an array
export default [
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware,
  screenTracking
];
