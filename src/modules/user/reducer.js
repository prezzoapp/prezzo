// @flow
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {reset} from '../signup';
import {SIGNUP_SUCCESS} from '../signup/types';
import {UPDATE_USER_SUCCESS} from './types';
import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS
} from '../auth/types';
import type State from './types';

const INITIAL_STATE: State = Map({
  account: null,
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      return loop(
        state.update('account', () => action.payload),
        Effects.constant(reset)
      );
    default:
      return state;
  }
};

export default reducer;
