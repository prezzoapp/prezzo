// @flow
import {Map,fromJS} from 'immutable';
import {
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_AVATAR_URL,
  UPDATE_SUBSCRIPTION_TO_PROMOTIONS,
  CLEAR_ERRORS,
  RESET
} from './types';
import type State from './types';
import {RESET_STATE} from '../../containers/session/SessionState';

const INITIAL_STATE: State = Map({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  avatarURL: '',
  isSubscribedToPromotions: true
});

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIRST_NAME:
      return state.update('firstName', () => action.payload);

    case UPDATE_LAST_NAME:
      return state.update('lastName', () => action.payload);

    case UPDATE_EMAIL:
      return state.update('email', () => action.payload);

    case UPDATE_PASSWORD:
      return state.update('password', () => action.payload);

    case UPDATE_AVATAR_URL:
      return state.update('avatarURL', () => action.payload);

    case UPDATE_SUBSCRIPTION_TO_PROMOTIONS:
      return state.update('isSubscribedToPromotions', () => action.payload);

    case CLEAR_ERRORS:
      return state.update('error', () => null);

    case RESET:
    case RESET_STATE:
      return fromJS(INITIAL_STATE);

    default:
      return state;
  }
};

export default reducer;
