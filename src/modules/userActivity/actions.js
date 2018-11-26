import { fromJS } from 'immutable';
import {
  GET_USER_OPEN_ORDER_REQUEST,
  GET_USER_OPEN_ORDER_SUCCESS,
  GET_USER_OPEN_ORDER_FAILURE,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,
  CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST,
  CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS,
  CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE,
  CHECK_ORDER_STATUS_REQUEST,
  CHECK_ORDER_STATUS_SUCCESS,
  CHECK_ORDER_STATUS_FAILURE
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
  amount: string,
  paymentType: string
) => async dispatch => {
  dispatch({ type: MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST });

  try {
    const data = await post(`/v1/transaction`, {
      order,
      token,
      amount,
      paymentType
    });

    return dispatch({
      type: MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE });
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

export const checkOrderStatus = async (orderId: string) => async dispatch => {
  dispatch({ type: CHECK_ORDER_STATUS_REQUEST });

  try {
    const updatedOrder = await get(`v1/order/${orderId}`);

    return dispatch({
      type: CHECK_ORDER_STATUS_SUCCESS,
      payload: fromJS(updatedOrder)
    });
  } catch (e) {
    dispatch({ type: CHECK_ORDER_STATUS_FAILURE });
  }
};
