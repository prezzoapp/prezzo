// @flow
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {reset} from '../signup';
import {SIGNUP_SUCCESS} from '../signup/types';
import {LOGIN_WITH_EMAIL_SUCCESS} from './types';
import type State from './types';

const INITIAL_STATE: State = Map({
  user: null,
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
      return loop(
        state.update('user', () => action.payload),
        Effects.constant(reset)
      );

    default:
      return state;
  }
};

export default reducer;
