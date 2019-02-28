import { fromJS } from 'immutable';

import {
  ADD_CREDIT_CARD_REQUEST,
  ADD_CREDIT_CARD_SUCCESS,
  ADD_CREDIT_CARD_FAILURE,
  REMOVE_CREDIT_CARD_REQUEST,
  REMOVE_CREDIT_CARD_SUCCESS,
  REMOVE_CREDIT_CARD_FAILURE,
  LIST_CREDIT_CARDS_REQUEST,
  LIST_CREDIT_CARDS_SUCCESS,
  LIST_CREDIT_CARDS_FAILURE,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  IS_TOKENIZATION_COMPLETE_REQUEST,
  IS_TOKENIZATION_COMPLETE_SUCCESS,
  IS_TOKENIZATION_COMPLETE_FAILURE,
  SHOW_LOADING,
  HIDE_LOADING
} from './types';

import { get, post, del } from '../../utils/api';

export const addCreditCardInfo = async (
  cardInfo: object,
  defaultPayment: boolean
) => async dispatch => {
  dispatch({ type: ADD_CREDIT_CARD_REQUEST });

  try {
    return dispatch({
      type: ADD_CREDIT_CARD_SUCCESS,
      payload: fromJS({
        cardInfo,
        defaultPayment
      })
    });
  } catch (e) {
    dispatch({ type: ADD_CREDIT_CARD_FAILURE });
  }
};

export const removeCreditCard = async(id: string) => async dispatch => {
  dispatch({ type: REMOVE_CREDIT_CARD_REQUEST });

  try {
    await del(`/v1/payment-methods/${id}`);

    return dispatch({
      type: REMOVE_CREDIT_CARD_SUCCESS,
      payload: fromJS(id)
    });
  } catch (e) {
    dispatch({ type: REMOVE_CREDIT_CARD_FAILURE });

    throw e;
  }
};

export const listCreditCards = async() => async dispatch => {
  dispatch({ type: LIST_CREDIT_CARDS_REQUEST });

  try {
    const data = await get(`/v1/payment-methods`);

    return dispatch({
      type: LIST_CREDIT_CARDS_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({
      type: LIST_CREDIT_CARDS_FAILURE,
      payload: e && e.message ? e.message : e
    });
    throw e;
  }
};

export const getToken = async () => async dispatch => {
  dispatch({ type: GET_TOKEN_REQUEST });

  try {
    const response = await get(`/v1/self/payment-token`);
    dispatch({ type: GET_TOKEN_SUCCESS });

    return response;
  } catch (e) {
    dispatch({ type: GET_TOKEN_FAILURE });
    throw e;
  }
};

export const isTokenizationComplete = async (
  nonce: string,
  isDefault: boolean
) => async dispatch => {
  dispatch({ type: IS_TOKENIZATION_COMPLETE_REQUEST });

  try {
    const paymentMethod = await post('/v1/payment-methods', {
      nonce,
      isDefault
    });

    dispatch({ type: IS_TOKENIZATION_COMPLETE_SUCCESS });
    return paymentMethod;
  } catch (e) {
    dispatch({ type: IS_TOKENIZATION_COMPLETE_FAILURE });
    throw e;
  }
};

export const showLoading = () => dispatch => {
  dispatch({ type: SHOW_LOADING });
};

export const hideLoading = () => dispatch => {
  dispatch({ type: HIDE_LOADING });
};
