import { fromJS, List } from 'immutable';

import {
  GET_USER_OPEN_ORDER_REQUEST,
  GET_USER_OPEN_ORDER_SUCCESS,
  GET_USER_OPEN_ORDER_FAILURE,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,
  CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST,
  CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS,
  CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE,
  CHECK_ORDER_STATUS_REQUEST,
  CHECK_ORDER_STATUS_SUCCESS,
  CHECK_ORDER_STATUS_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: [],
  openOrderFinalStatus: ''
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_OPEN_ORDER_REQUEST:
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST:
    case CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST:
    case CHECK_ORDER_STATUS_REQUEST:
      return state.update('isBusy', () => true);

    case GET_USER_OPEN_ORDER_FAILURE:
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE:
    case CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE:
    case CHECK_ORDER_STATUS_FAILURE:
      return state.update('isBusy', () => false);

    case GET_USER_OPEN_ORDER_SUCCESS:
      console.log('User Open Order: ');
      console.log(action.payload.toJS());
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);
    case CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS:
    case CHECK_ORDER_STATUS_SUCCESS:
      // const updatedStateAfterOrderStatusCheck =
      //   (action.payload.get('finalStatus') === 'complete' ||
      //   action.payload.get('finalStatus') === 'denied')
      //     ? action.payload.update('order', () => [])
      //     : action.payload;

      // console.log(action.payload.toJS());
      // return state;
      console.log('After Updation: ');
      console.log(action.payload.toJS());

      const updatedStateAfterOrderStatusCheck =
        (action.payload.first().get('status') === 'complete' ||
        action.payload.first().get('status') === 'denied')
          ? List([])
          : action.payload;

      return state
        .update('data', () => updatedStateAfterOrderStatusCheck)
        .update('openOrderFinalStatus', () => action.payload.first().get('status'))
        .update('isBusy', () => false);
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS:

      const payload = List([action.payload]);

      console.log("Payload: ");
      console.log(payload.first().get('status'));

      const updatedStateAfterPayment =
        (payload.first().get('status') === 'complete')
          ? List([])
          : payload;

      return state
        .update('data', () => updatedStateAfterPayment)
        .update('openOrderFinalStatus', () => payload.first().get('status'))
        .update('isBusy', () => false);
    default:
      return state;
  }
};
