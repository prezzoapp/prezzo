// @flow
import { INITIALIZE_STATE, RESET_STATE } from './types';

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
