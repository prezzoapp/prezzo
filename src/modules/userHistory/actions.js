import { fromJS } from 'immutable';
import {
  GET_USER_COMPLETED_ORDERS_REQUEST,
  GET_USER_COMPLETED_ORDERS_SUCCESS,
  GET_USER_COMPLETED_ORDERS_FAILURE
} from './types';

import { get } from '../../utils/api';

export const listCompletedOrders = async (
  userId: string,
  status: string
) => async dispatch => {
  dispatch({ type: GET_USER_COMPLETED_ORDERS_REQUEST });

  try {
    const data = await get(`/v1/users/${userId}/orders?status=${status}&userType=customer`);

    return dispatch({
      type: GET_USER_COMPLETED_ORDERS_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: GET_USER_COMPLETED_ORDERS_FAILURE });

    throw e;
  }
};
