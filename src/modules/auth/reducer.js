// @flow
import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import { setAuthenticationToken } from './actions';
import { SIGNUP_SUCCESS } from '../Signup/types';
import {
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_FAILURE,
  SET_AUTHENTICATION_TOKEN,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE
} from './types';
import type State from './types';

const INITIAL_STATE: State = Map({
  token: '',
  error: null,
  isBusy: false
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_WITH_EMAIL_REQUEST:
    case USER_LOGOUT_REQUEST:
      return state.update('isBusy', () => true);
    case SIGNUP_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      return loop(
        state.update('isBusy', () => false),
        Effects.promise(setAuthenticationToken, action.payload));
    case SET_AUTHENTICATION_TOKEN:
      return state.update('token', () => action.payload);
    case USER_LOGOUT_SUCCESS:
    case USER_LOGOUT_FAILURE:
      return state.update('isBusy', () => false);
      case LOGIN_WITH_EMAIL_FAILURE:
        return state.update('isBusy', () => false);
    default:
      return state;
  }
};

export default reducer;
