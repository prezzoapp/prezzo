// @flow
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {setAuthenticationToken} from './actions';
import {SIGNUP_SUCCESS} from '../signup/types';
import {
  SET_AUTHENTICATION_TOKEN,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS
} from './types';
import type State from './types';

const INITIAL_STATE: State = Map({
  token: '',
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      return loop(
        state,
        Effects.promise(
          setAuthenticationToken,
          action.payload
        )
      );
    case SET_AUTHENTICATION_TOKEN:
      return state.update('token', () => action.payload);
    default:
      return state;
  }
};

export default reducer;
