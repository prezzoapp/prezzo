// @flow
import {
  INITIALIZE_STATE,
  RESET_STATE,
  FONTS_LOADED
} from './types';

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE
  };
}

export function resetSessionStateFromSnapshot(state) {
  return {
    type: RESET_STATE,
    payload: state
  };
}

export function resetStateAfterFontLoaded(state) {
  return {
    type: FONTS_LOADED,
    payload: state
  };
}
