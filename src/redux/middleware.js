import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware';
import { middleware } from '../utils/redux';
import screenTracking from './middleware/screenTracking';

// define store middlewares as an array
export default [
  middleware,
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware,
  screenTracking
];
