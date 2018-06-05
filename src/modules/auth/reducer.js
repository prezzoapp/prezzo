// @flow
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {reset} from '../signup';
import {SIGNUP_SUCCESS} from '../signup/types';
import type State from '../signup/types';

const INITIAL_STATE = Map({
  user: null,
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return loop(
        state.update('user', () => action.payload),
        Effects.constant(reset)
      );

    default:
      return state;
  }
};

export default reducer;
