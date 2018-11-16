import { fromJS } from 'immutable';
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
  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,
  LIST_CLOSED_TABLE_REQUEST,
  LIST_CLOSED_TABLE_SUCCESS,
  LIST_CLOSED_TABLE_FAILURE,
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
    await post(`/v1/transaction`, {
      order,
      token,
      amount,
      paymentType
    });

    return dispatch({
      type: MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
      payload: { order, status, orderType }
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
  status: string,
  type: string
) => async dispatch => {
  dispatch({ type: CHANGE_ORDER_STATUS_REQUEST });

  try {
    await post(`/v1/orders/${orderId}`, { status });

    return dispatch({
      type: CHANGE_ORDER_STATUS_SUCCESS,
      payload: { orderId, status, type }
    });
  } catch (e) {
    dispatch({
      type: CHANGE_ORDER_STATUS_FAILURE,
      payload: e && e.message ? e.message : e
    });
  }
};

export const listClosedTable = async (vendorId: string) => async dispatch => {
  // type: LIST_CLOSED_TABLE_REQUEST,
  // payload: null

  dispatch({ type: LIST_CLOSED_TABLE_REQUEST });

  try {
    const order = await get(
      `v1/vendors/${vendorId}/orders?status=complete&type=table`
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
