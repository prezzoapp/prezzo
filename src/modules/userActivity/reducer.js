import { fromJS } from 'immutable';

import {
  GET_USER_OPEN_ORDER_REQUEST,
  GET_USER_OPEN_ORDER_SUCCESS,
  GET_USER_OPEN_ORDER_FAILURE,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,
  CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST,
  CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS,
  CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST:
    case CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST:
      return state.update('isBusy', () => true);

    case GET_USER_OPEN_ORDER_FAILURE:
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE:
    case CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE:
      return state.update('isBusy', () => false);

    case GET_USER_OPEN_ORDER_SUCCESS:
    case CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS:
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS:
      return state
        .update('data', () => fromJS([]))
        .update('isBusy', () => false);

    case GET_USER_OPEN_ORDER_REQUEST:
    default:
      return state;
  }
};
