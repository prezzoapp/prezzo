// @flow
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE,
  LIST_VENDORS_REQUEST,
  LIST_VENDORS_SUCCESS,
  LIST_VENDORS_FAILURE,
  UPDATE_DISTANCE_REQUEST,
  UPDATE_DISTANCE_SUCCESS,
  UPDATE_DISTANCE_FAILURE
} from './types';
import { get } from '../../utils/api';

export const toggleFilter = async (filterId: number) => async dispatch => {
  dispatch({ type: TOGGLE_FILTER_REQUEST });

  try {
    dispatch({
      type: TOGGLE_FILTER_SUCCESS,
      payload: filterId
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: TOGGLE_FILTER_FAILURE });
  }
};

export const listVendors = async (
  latitude: string,
  longitude: string,
  distance: string
) => async dispatch => {
  dispatch({ type: LIST_VENDORS_REQUEST });

  try {
    const vendors = await get(
      `/v1/vendors?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
    );

    dispatch({
      type: LIST_VENDORS_SUCCESS,
      payload: fromJS(vendors)
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: LIST_VENDORS_FAILURE });
  }
};

export const updateDistance = async (
  latitude: string,
  longitude: string,
  distance: string
) => async dispatch => {
  dispatch({ type: UPDATE_DISTANCE_REQUEST });

  try {
    const vendors = await get(
      `/v1/vendors?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
    );

    const vendorsData = fromJS(vendors);
    const updatedDistance = fromJS(distance);

    dispatch({
      type: UPDATE_DISTANCE_SUCCESS,
      payload: { vendorsData, updatedDistance }
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: UPDATE_DISTANCE_FAILURE });
  }
};
