// @flow
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {reset} from '../Signup';
import {SIGNUP_SUCCESS} from '../Signup/types';
import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
  FIND_USER_FAILURE
} from './types';
import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS
} from '../auth/types';
import type State from './types';

const INITIAL_STATE: State = Map({
  account: null,
  isBusy: false,
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case FIND_USER_REQUEST:
      return state.update('isBusy', () => true);
    case UPDATE_USER_FAILURE:
    case FIND_USER_FAILURE:
    case FIND_USER_SUCCESS:
      return state.update('isBusy', () => false);
    case SIGNUP_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      return loop(
        state.update('account', () => action.payload).update('isBusy', () => false),
        Effects.constant(reset)
      );
    default:
      return state;
  }
};

export default reducer;
