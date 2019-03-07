import { fromJS } from 'immutable';
import {
  WAITER_REQUESTED_TABLE_REQUEST,
  WAITER_REQUESTED_TABLE_SUCCESS,
  WAITER_REQUESTED_TABLE_FAILURE,
  PHOTO_REVIEW_TABLE_REQUEST,
  PHOTO_REVIEW_TABLE_SUCCESS,
  PHOTO_REVIEW_TABLE_FAILURE,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  ADD_WAITER_REQUESTED_ITEM_DETAILS_REQUEST,
  ADD_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS,
  ADD_WAITER_REQUESTED_ITEM_DETAILS_FAILURE,
  REMOVE_WAITER_REQUESTED_ITEM_DETAILS_REQUEST,
  REMOVE_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS,
  REMOVE_WAITER_REQUESTED_ITEM_DETAILS_FAILURE,
  ADD_PHOTO_REVIEW_ITEM_DETAILS_REQUEST,
  ADD_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS,
  ADD_PHOTO_REVIEW_ITEM_DETAILS_FAILURE,
  REMOVE_PHOTO_REVIEW_ITEM_DETAILS_REQUEST,
  REMOVE_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS,
  REMOVE_PHOTO_REVIEW_ITEM_DETAILS_FAILURE
} from './types';

import { get } from '../../utils/api';

export const listWaiterRequestTable = async (
  vendorId: string
) => async dispatch => {
  dispatch({ type: WAITER_REQUESTED_TABLE_REQUEST });

  try {
    const order = await get(
      `v1/vendors/${vendorId}/orders?status=active&type=table`
    );

    return dispatch({
      type: WAITER_REQUESTED_TABLE_SUCCESS,
      payload: fromJS(order)
    });
  } catch (e) {
    dispatch({
      type: WAITER_REQUESTED_TABLE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const listPhotoReviewTable = async (
  vendorId: string
) => async dispatch => {
  dispatch({ type: PHOTO_REVIEW_TABLE_REQUEST });

  try {
    const order = await get(
      `v1/vendors/${vendorId}/orders?status=active&type=table`
    );

    return dispatch({
      type: PHOTO_REVIEW_TABLE_SUCCESS,
      payload: fromJS(order)
    });
  } catch (e) {
    dispatch({
      type: PHOTO_REVIEW_TABLE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const changeSection = async (section: number) => async dispatch => {
  dispatch({
    type: SECTION_CHANGE,
    payload: section
  });
};

export const changeLayout = (layout: string) => dispatch => {
  dispatch({
    type: LAYOUT_CHANGE,
    payload: layout
  });
};

export const addWaiterRequestedItemDetails = (item: object) => dispatch => {
  dispatch({ type: ADD_WAITER_REQUESTED_ITEM_DETAILS_REQUEST });

  try {
    return dispatch({
      type: ADD_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS,
      payload: fromJS(item)
    });
  } catch (e) {
    dispatch({ type: ADD_WAITER_REQUESTED_ITEM_DETAILS_FAILURE });
  }
};

export const removeWaiterRequestedItemDetails = () => dispatch => {
  dispatch({ type: REMOVE_WAITER_REQUESTED_ITEM_DETAILS_REQUEST });

  try {
    return dispatch({
      type: REMOVE_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS
    });
  } catch (e) {
    dispatch({ type: REMOVE_WAITER_REQUESTED_ITEM_DETAILS_FAILURE });
  }
};

export const addPhotoReviewItemDetails = (item: object) => dispatch => {
  dispatch({ type: ADD_PHOTO_REVIEW_ITEM_DETAILS_REQUEST });

  try {
    return dispatch({
      type: ADD_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS,
      payload: fromJS(item)
    });
  } catch (e) {
    dispatch({ type: ADD_PHOTO_REVIEW_ITEM_DETAILS_FAILURE });
  }
};

export const removePhotoReviewItemDetails = () => dispatch => {
  dispatch({ type: REMOVE_PHOTO_REVIEW_ITEM_DETAILS_REQUEST });

  try {
    return dispatch({
      type: REMOVE_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS
    });
  } catch (e) {
    dispatch({ type: REMOVE_PHOTO_REVIEW_ITEM_DETAILS_FAILURE });
  }
};
