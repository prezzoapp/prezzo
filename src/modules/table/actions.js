import { fromJS } from 'immutable';
import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_OPEN_TABLE_SUCCESS,
  LIST_OPEN_TABLE_FAILURE,
  LIST_QUEUED_TABLE_REQUEST,
  LIST_QUEUED_TABLE_SUCCESS,
  LIST_QUEUED_TABLE_FAILURE,
  APPROVE_ORDER_REQUEST,
  APPROVE_ORDER_SUCCESS,
  APPROVE_ORDER_FAILURE,
  LIST_CLOSED_TABLE_REQUEST,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE
} from './types';

import { get, post } from '../../utils/api';

export const listOpenTable = async () => async dispatch => {
  dispatch({ type: LIST_OPEN_TABLE_REQUEST });

  try {
    const order = await get(
      'v1/vendors/5bd2c1001392eb0a5c23c090/orders?status=active&type=table'
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

export const listQueuedTable = async () => async dispatch => {
  dispatch({ type: LIST_QUEUED_TABLE_REQUEST });

  try {
    const order = await get(
      'v1/vendors/5bd2c1001392eb0a5c23c090/orders?status=pending&type=table'
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

export const approveDenyOrder = async (
  orderId: string,
  status: string
) => async dispatch => {
  dispatch({ type: APPROVE_ORDER_REQUEST });

  try {
    await post(`/v1/orders/${orderId}`, { status });

    return dispatch({
      type: APPROVE_ORDER_SUCCESS
    });
  } catch (e) {
    dispatch({
      type: APPROVE_ORDER_FAILURE,
      payload: e && e.message ? e.message : e
    })
  }
}

export const listClosedTable = () => ({
  type: LIST_CLOSED_TABLE_REQUEST,
  payload: null
});

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
