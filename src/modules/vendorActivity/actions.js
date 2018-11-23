import { fromJS } from 'immutable';
import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_OPEN_TABLE_SUCCESS,
  LIST_OPEN_TABLE_FAILURE,

  LIST_QUEUED_TABLE_REQUEST,
  LIST_DELIVERED_TABLE_REQUEST,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE
} from './types';

import { get } from '../../utils/api';

export const listWaiterRequestTable = async (
  vendorId: string
) => async dispatch => {
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

export const listPhotoReviewTable = () => ({
  type: LIST_QUEUED_TABLE_REQUEST,
  payload: null
});

export const listDeliveredTable = () => ({
  type: LIST_DELIVERED_TABLE_REQUEST,
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
