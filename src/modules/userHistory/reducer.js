import {
  GET_USER_COMPLETED_ORDERS_REQUEST,
  GET_USER_COMPLETED_ORDERS_SUCCESS,
  GET_USER_COMPLETED_ORDERS_FAILURE
} from './types';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_COMPLETED_ORDERS_REQUEST:
      return state.update('isBusy', () => true);
    case GET_USER_COMPLETED_ORDERS_SUCCESS:
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);
    case GET_USER_COMPLETED_ORDERS_FAILURE:
      return state.update('isBusy', () => false);
    default:
      return state;
  }
};
