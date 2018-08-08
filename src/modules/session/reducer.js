// @flow
import {Map} from 'immutable';
import {
  INITIALIZE_STATE,
  RESET_STATE
} from './types';

const INITIAL_STATE = Map({isReady: false});

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isReady', true);
    default:
      return state;
  }
};