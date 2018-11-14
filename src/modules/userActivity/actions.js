import { fromJS } from 'immutable';
import {
  GET_USER_OPEN_ORDER_REQUEST,
  GET_USER_OPEN_ORDER_SUCCESS,
  GET_USER_OPEN_ORDER_FAILURE,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE
} from './types';
import { get, post } from '../../utils/api';

export const listOpenOrders = async (
  userId: string,
  status: string
) => async dispatch => {
  dispatch({ type: GET_USER_OPEN_ORDER_REQUEST });

  try {
    const data = await get(`/v1/users/${userId}/orders?status=${status}`);

    return dispatch({
      type: GET_USER_OPEN_ORDER_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: GET_USER_OPEN_ORDER_FAILURE });
  }
};

export const makePaymentAndCompleteOrder = async (
  order: string,
  token: string,
  amount: string
) => async dispatch => {
  dispatch({ type: MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST });

  try {
    await post(`/v1/transaction`, {
      order,
      token,
      amount
    });

    return dispatch({
      type: MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS
    });
  } catch (e) {
    dispatch({ type: MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE });
  }
}
