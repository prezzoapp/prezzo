import { fromJS } from 'immutable';

import {
  GET_USER_OPEN_ORDER_REQUEST,
  GET_USER_OPEN_ORDER_SUCCESS,
  GET_USER_OPEN_ORDER_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_OPEN_ORDER_REQUEST:
      return state.update('isBusy', () => true);

    case GET_USER_OPEN_ORDER_FAILURE:
      return state.update('isBusy', () => false);


    case GET_USER_OPEN_ORDER_SUCCESS:
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);
    default:
      return state;
  }
};
