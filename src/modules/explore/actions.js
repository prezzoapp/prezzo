// @flow
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE,
  LIST_VENDORS_REQUEST,
  LIST_VENDORS_SUCCESS,
  LIST_VENDORS_FAILURE
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

export const listVendors = async () => async dispatch => {
  dispatch({ type: LIST_VENDORS_REQUEST });

  try {
    const vendors = await get('/v1/vendors');

    dispatch({
      type: LIST_VENDORS_SUCCESS,
      payload: fromJS(vendors)
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: LIST_VENDORS_FAILURE });
  }
};
