// @flow
import { Map } from 'immutable';
import {
  INITIALIZE_STATE,
  RESET_STATE,
  FONTS_LOADED
} from './types';

const INITIAL_STATE = Map({ isReady: false, isFontsLoaded: false });

export default (state = INITIAL_STATE, action = {}) => {
  console.log('Action: ',action.type)
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isReady', true).set('isFontsLoaded', false);
      break;
    case FONTS_LOADED:
      return state.set('isFontsLoaded', true);
      break;
    default:
      return state;
  }
};
