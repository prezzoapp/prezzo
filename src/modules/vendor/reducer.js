// @flow
import {Map} from 'immutable';
import {
  CREATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_REQUEST,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE
} from './types';
import {UPDATE_USER_SUCCESS} from '../user/types';
import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS
} from '../auth/types';
import type State from './types';

const INITIAL_STATE: State = Map({
  isBusy: false,
  data: null,
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_VENDOR_REQUEST:
      return state.update('isBusy', () => true);
    case UPDATE_VENDOR_FAILURE:
      return state.update('isBusy', () => false);
    case CREATE_VENDOR_SUCCESS:
    case UPDATE_VENDOR_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      return state.update('data', () => payload)
        .update('isBusy', () => false);
    default:
      return state;
  }
};

export default reducer;
