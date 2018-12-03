import { fromJS } from 'immutable';
import { Alert } from 'react-native';
import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_OPEN_TABLE_SUCCESS,
  LIST_OPEN_TABLE_FAILURE,

  LIST_QUEUED_TABLE_REQUEST,
  LIST_QUEUED_TABLE_SUCCESS,
  LIST_QUEUED_TABLE_FAILURE,

  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAILURE,

  LIST_CLOSED_TABLE_REQUEST,
  LIST_CLOSED_TABLE_SUCCESS,
  LIST_CLOSED_TABLE_FAILURE,

  OPEN_TABLE_SELECTED_ITEM_REQUEST,
  OPEN_TABLE_SELECTED_ITEM_SUCCESS,
  OPEN_TABLE_SELECTED_ITEM_FAILURE,

  CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST,
  CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS,
  CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE,

  CHECK_OPEN_ORDER_STATUS_REQUEST,
  CHECK_OPEN_ORDER_STATUS_SUCCESS,
  CHECK_OPEN_ORDER_STATUS_FAILURE,

  CHECK_QUEUE_ORDER_STATUS_REQUEST,
  CHECK_QUEUE_ORDER_STATUS_SUCCESS,
  CHECK_QUEUE_ORDER_STATUS_FAILURE,

  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,

  SHOW_ALERT,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE
} from './types';

import { get, post } from '../../utils/api';

export const listOpenTable = async (vendorId: string) => async dispatch => {
  dispatch({ type: LIST_OPEN_TABLE_REQUEST });

  try {
    const order = await get(
      `v1/vendors/${vendorId}/orders?status=active&type=table`
    );

    return dispatch({
      type: LIST_OPEN_TABLE_SUCCESS,
      payload: fromJS(order)
    });
  } catch (e) {
    dispatch({
      type: LIST_OPEN_TABLE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const listQueuedTable = async (vendorId: string) => async dispatch => {
  dispatch({ type: LIST_QUEUED_TABLE_REQUEST });

  try {
    const order = await get(
      `v1/vendors/${vendorId}/orders?status=pending&type=table`
    );

    return dispatch({
      type: LIST_QUEUED_TABLE_SUCCESS,
      payload: fromJS(order)
    });
  } catch (e) {
    dispatch({
      type: LIST_QUEUED_TABLE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const makePaymentAndCompleteOrder = async (
  order: string,
  token: string,
  amount: string,
  paymentType: string,
  status: string,
  orderType: string
) => async dispatch => {
  dispatch({ type: MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST });

  try {
    const updatedOrder = await post(`/v1/transaction`, {
      order,
      token,
      amount,
      paymentType
    });

    return dispatch({
      type: MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
      payload: fromJS(updatedOrder)
    });
  } catch (e) {
    dispatch({
      type: MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,
      payload: e && e.message ? e.message : e
    });
  }
};

export const changeOrderStatus = async (
  orderId: string,
  status: string
) => async dispatch => {
  dispatch({ type: CHANGE_ORDER_STATUS_REQUEST });

  try {
    const updatedOrder = await post(`/v1/orders/${orderId}`, { status });
    if(updatedOrder.status === 'active') {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(showAlert('Order has been successfully activated!'));
      }, 300);

      return dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: { orderId, status }
      });
    } else if(updatedOrder.status === 'denied') {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(showAlert('Order has been successfully denied!'));
      }, 300);

      return dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: { orderId, status }
      });
    }
  } catch (e) {
    dispatch({
      type: CHANGE_ORDER_STATUS_FAILURE,
      payload: e && e.message ? e.message : e
    });
  }
};

export const listClosedTable = async (vendorId: string) => async dispatch => {
  dispatch({ type: LIST_CLOSED_TABLE_REQUEST });

  try {
    const order = await get(
      `v1/vendors/${vendorId}/orders?status=complete&type=table&page=1`
    );

    return dispatch({
      type: LIST_CLOSED_TABLE_SUCCESS,
      payload: fromJS(order)
    });
  } catch (e) {
    dispatch({
      type: LIST_CLOSED_TABLE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const openTableItemDetails = (item: object) => dispatch => {
  dispatch({ type: OPEN_TABLE_SELECTED_ITEM_REQUEST });

  try {
    return dispatch({
      type: OPEN_TABLE_SELECTED_ITEM_SUCCESS,
      payload: fromJS(item)
    });
  } catch (e) {
    dispatch({ type: OPEN_TABLE_SELECTED_ITEM_FAILURE });
  }
};

export const checkStatusAndCancelItem = async (
  order: string,
  item: string
) => async dispatch => {
  dispatch({ type: CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST });

  try {
    const updatedOrder = await post(`/v1/order/${order}/item/${item}`);

    return dispatch({
      type: CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS,
      payload: fromJS(updatedOrder)
    });
  } catch (e) {
    dispatch({ type: CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE });
  }
};

export const checkOpenOrderStatus = async (
  orderId: string
) => async dispatch => {
  dispatch({ type: CHECK_OPEN_ORDER_STATUS_REQUEST });

  try {
    const updatedOrder = await get(`v1/order/${orderId}`);

    return dispatch({
      type: CHECK_OPEN_ORDER_STATUS_SUCCESS,
      payload: fromJS(updatedOrder)
    });
  } catch (e) {
    dispatch({ type: CHECK_OPEN_ORDER_STATUS_FAILURE });
  }
};

export const checkQueueOrderStatus = async (
  orderId: string,
  status: string
) => async dispatch => {
  dispatch({ type: CHECK_QUEUE_ORDER_STATUS_REQUEST });

  try {
    const updatedOrder = await get(`v1/order/${orderId}`);

    if(
      updatedOrder.order[0].status === 'active' ||
      updatedOrder.order[0].status === 'complete' ||
      updatedOrder.order[0].status === 'denied'
    ) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(
          showAlert(`This order is already ${updatedOrder.order[0].status}!`)
        );
      }, 300);

      return dispatch({
        type: CHECK_QUEUE_ORDER_STATUS_SUCCESS,
        payload: fromJS(updatedOrder)
      });
    }
    dispatch(changeOrderStatus(orderId, status));
  } catch (e) {
    dispatch({ type: CHECK_QUEUE_ORDER_STATUS_FAILURE });
  }
};

showAlert = message => {
  Alert.alert('', message);
  return {
    type: SHOW_ALERT
  }
}

export const acceptQueuedRequest = (queueList: any, requestId: string) => {
  const queuedList = queueList.filter(element => element.id != requestId);
  return {
    type: ACCEPT_QUEUED_REQUEST,
    payload: queuedList
  };
};

export const deleteQueuedRequest = (queueList: any, requestId: string) => {
  const queuedList = queueList.filter(element => element.id != requestId);
  return {
    type: DELETE_QUEUED_REQUEST,
    payload: queuedList
  };
};

export const changeSection = (section: number) => ({
  type: SECTION_CHANGE,
  payload: section
});

export const changeLayout = (layout: string) => ({
  type: LAYOUT_CHANGE,
  payload: layout
});

export const changeClosedSection = (section: number) => ({
  type: CLOSED_TABLE_SECTION_CHANGE,
  payload: section
});
