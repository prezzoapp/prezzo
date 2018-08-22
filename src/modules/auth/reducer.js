// @flow
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {setAuthenticationToken} from './actions';
import {SIGNUP_SUCCESS} from '../Signup/types';
import {
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
    case USER_LOGOUT_REQUEST:
      return state.update('isBusy', () => true);
    case SIGNUP_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      console.log("User Info: ");
      console.log(action.payload.toJS());

      return loop(
        state,
        Effects.promise(
          setAuthenticationToken,
          action.payload
        )
      );
    case SET_AUTHENTICATION_TOKEN:
      return state.update('token', () => action.payload);
    case USER_LOGOUT_SUCCESS:
      return state
        .set('token', '')
        .set('error', null)
        .set('isBusy', false);

    case USER_LOGOUT_FAILURE:
      return state.update('isBusy', () => false);
    default:
      return state;
  }
};

export default reducer;
