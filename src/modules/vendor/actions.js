// @flow
import {fromJS} from 'immutable';
import {
  CREATE_VENDOR_REQUEST,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  UPDATE_VENDOR_REQUEST,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE
} from './types';
import {post, put} from '../../utils/api';

export const createVendor = async params => async(dispatch: ReduxDispatch) => {
  dispatch({
    type: CREATE_VENDOR_REQUEST
  });

  try {
    const {vendor} = await post('/v1/vendors', params);

    return dispatch({
      type: CREATE_VENDOR_SUCCESS,
      payload: fromJS(vendor)
    });
  } catch (e) {
    dispatch({
      type: CREATE_VENDOR_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const updateVendor = async (id: string, params: any) => async(dispatch: ReduxDispatch) => {
  dispatch({
    type: UPDATE_VENDOR_REQUEST
  });

  try {
    const {vendor} = await put(`/v1/vendors/${id}`, params);

    return dispatch({
      type: UPDATE_VENDOR_SUCCESS,
      payload: fromJS(vendor)
    });
  } catch (e) {
    dispatch({
      type: UPDATE_VENDOR_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
