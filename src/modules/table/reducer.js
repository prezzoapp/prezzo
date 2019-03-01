// @flow
import { fromJS, List } from 'immutable';
import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_OPEN_TABLE_SUCCESS,
  LIST_OPEN_TABLE_FAILURE,

  LIST_QUEUED_TABLE_SUCCESS,
  LIST_QUEUED_TABLE_FAILURE,
  LIST_QUEUED_TABLE_REQUEST,

  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAILURE,

  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,

  OPEN_TABLE_SELECTED_ITEM_REQUEST,
  OPEN_TABLE_SELECTED_ITEM_SUCCESS,
  OPEN_TABLE_SELECTED_ITEM_FAILURE,

  REMOVE_SELECTED_TABLE_ITEM_REQUEST,
  REMOVE_SELECTED_TABLE_ITEM_SUCCESS,
  REMOVE_SELECTED_TABLE_ITEM_FAILURE,

  CHECK_OPEN_ORDER_STATUS_REQUEST,
  CHECK_OPEN_ORDER_STATUS_SUCCESS,
  CHECK_OPEN_ORDER_STATUS_FAILURE,

  CHECK_QUEUE_ORDER_STATUS_REQUEST,
  CHECK_QUEUE_ORDER_STATUS_SUCCESS,
  CHECK_QUEUE_ORDER_STATUS_FAILURE,

  CHANGE_STATUS_AND_CANCEL_ORDER_ITEM_REQUEST,
  CHANGE_STATUS_AND_CANCEL_ORDER_ITEM_SUCCESS,
  CHANGE_STATUS_AND_CANCEL_ORDER_ITEM_FAILURE,
  SHOW_ALERT,

  LIST_CLOSED_TABLE_REQUEST,
  LIST_CLOSED_TABLE_SUCCESS,
  LIST_CLOSED_TABLE_FAILURE,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE
} from './types';

const INITIAL_STATE = fromJS({
  layout: 'list',
  section: 0,
  closedTableSection: 0,
  openTableList: [],
  queuedTableList: [],
  closedTableList: [],
  openTableSelectedItem: null,
  isBusy: false,
  openOrderFinalStatus: ''
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_OPEN_TABLE_REQUEST:
    case LIST_QUEUED_TABLE_REQUEST:
    case CHECK_OPEN_ORDER_STATUS_REQUEST:
    case CHECK_QUEUE_ORDER_STATUS_REQUEST:
    case CHANGE_ORDER_STATUS_REQUEST:
    case MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST:
    case LIST_CLOSED_TABLE_REQUEST:
    case CHANGE_STATUS_AND_CANCEL_ORDER_ITEM_REQUEST:
      return state.update('isBusy', () => true);

    case LIST_OPEN_TABLE_FAILURE:
    case LIST_QUEUED_TABLE_FAILURE:
    case CHECK_OPEN_ORDER_STATUS_FAILURE:
    case CHECK_QUEUE_ORDER_STATUS_FAILURE:
    case CHANGE_ORDER_STATUS_FAILURE:
    case LIST_CLOSED_TABLE_FAILURE:
    case CHANGE_STATUS_AND_CANCEL_ORDER_ITEM_FAILURE:
      return state.update('isBusy', () => false);

    case LIST_OPEN_TABLE_SUCCESS:
      return state.update('openTableList', () => action.payload).update('isBusy', () => false);

    case LIST_QUEUED_TABLE_SUCCESS:
      return state.update('queuedTableList', () => action.payload).update('isBusy', () => false);

    case SECTION_CHANGE:
      return state.update('section', () => action.payload);

    case LAYOUT_CHANGE:
      return state.update('layout', () => action.payload);

    case CLOSED_TABLE_SECTION_CHANGE:
      return state.update('closedTableSection', () => action.payload);

    case LIST_CLOSED_TABLE_SUCCESS:
      return state.update('closedTableList', () => action.payload).update('isBusy', () => false);


    case CHECK_OPEN_ORDER_STATUS_SUCCESS:
    case CHANGE_STATUS_AND_CANCEL_ORDER_ITEM_SUCCESS:
      let newlyStateAfterStatusCheck = state;

      const updatedStateAfterOrderStatusCheck =
        (action.payload.first().get('status') === 'complete' ||
        action.payload.first().get('status') === 'denied')
          ? null
          : action.payload.first();

      if(updatedStateAfterOrderStatusCheck !== null) {
        const itemIndex =
          state.get('openTableList').findIndex(ele =>
            ele.get('_id') === updatedStateAfterOrderStatusCheck.get('_id')
          );

        const newState = (itemIndex !== -1)
          ? state.updateIn(['openTableList', itemIndex], () => updatedStateAfterOrderStatusCheck)
          : state;

        newlyStateAfterStatusCheck = newState
          .update('openTableSelectedItem', () => updatedStateAfterOrderStatusCheck)
          .update('openOrderFinalStatus', () => action.payload.first().get('status'))
          .update('isBusy', () => false);
      } else {
        newlyStateAfterStatusCheck = state
          .update('openTableList', () =>
            state.get('openTableList').filter(ele => ele.get('_id') !== action.payload.first().get('_id')))
          .update('openTableSelectedItem', () => null)
          .update('openOrderFinalStatus', () => action.payload.first().get('status'))
          .update('isBusy', () => false);
      }

      return newlyStateAfterStatusCheck;

    case CHECK_QUEUE_ORDER_STATUS_SUCCESS:
      if(
        action.payload.first().get('status') === 'active' ||
        action.payload.first().get('status') === 'denied' ||
        action.payload.first().get('status') === 'complete') {
        const newQueuedList = state.get('queuedTableList').filter(item => item.get('_id') !== action.payload.first().get('_id'));
        return state
          .update('queuedTableList', () => newQueuedList)
          .update('openOrderFinalStatus', () => action.payload.first().get('status'))
          .update('isBusy', () => false);
      }
      return state
        .update('openOrderFinalStatus', () => action.payload.first().get('status'))
        .update('isBusy', () => false);

    case MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS:
      let newlyStateAfterPayment = state;

      const updatedStateAfterPayment =
        (action.payload.get('status') === 'complete')
          ? null
          : action.payload;

      if(updatedStateAfterPayment !== null) {
        const itemIndex =
          state.get('openTableList').findIndex(ele =>
            ele.get('_id') === updatedStateAfterPayment.get('_id')
          );

        const newState = (itemIndex !== -1)
          ? state.updateIn(['openTableList', itemIndex], () => updatedStateAfterPayment)
          : state;

        newlyStateAfterPayment = newState
          .update('openTableSelectedItem', () => updatedStateAfterPayment)
          .update('openOrderFinalStatus', () => action.payload.get('status'))
          .update('isBusy', () => false);
      } else {
        newlyStateAfterPayment = state
          .update('openTableList', () =>
            state.get('openTableList').filter(ele => ele.get('_id') !== action.payload.get('_id')))
          .update('openTableSelectedItem', () => null)
          .update('openOrderFinalStatus', () => action.payload.get('status'))
          .update('isBusy', () => false);
      }

      return newlyStateAfterPayment;

    case CHANGE_ORDER_STATUS_SUCCESS:
      const newQueuedList = state.get('queuedTableList').filter(item => item.get('_id') !== action.payload.get('_id'));

      return state
        .update('openOrderFinalStatus', () => action.payload.get('status'))
        .update('queuedTableList', () => newQueuedList)
        .update('isBusy', () => false);

    case OPEN_TABLE_SELECTED_ITEM_SUCCESS:
      return state.update('openTableSelectedItem', () => action.payload).update('isBusy', () => false);

    case REMOVE_SELECTED_TABLE_ITEM_SUCCESS:
      return state.update('openTableSelectedItem', () => null);

    case MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE:
      return state.update('isBusy', () => false);

    case REMOVE_SELECTED_TABLE_ITEM_REQUEST:
    case REMOVE_SELECTED_TABLE_ITEM_FAILURE:
    case SHOW_ALERT:
    default:
      return state;
  }
};

export default reducer;
