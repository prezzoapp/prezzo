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
  LIST_CREDIT_CARDS_FAILURE
} from './types';

import { get } from '../../utils/api';

export const addCreditCardInfo = async(cardInfo: object) => async dispatch => {
  dispatch({ type: ADD_CREDIT_CARD_REQUEST });

  try {
    return dispatch({
      type: ADD_CREDIT_CARD_SUCCESS,
      payload: fromJS(cardInfo)
    });
  } catch (e) {
    dispatch({ type: ADD_CREDIT_CARD_FAILURE });
  }
};

export const removeCreditCard = async(id: string) => async dispatch => {
  dispatch({ type: REMOVE_CREDIT_CARD_REQUEST });

  try {
    return dispatch({
      type: REMOVE_CREDIT_CARD_SUCCESS,
      payload: fromJS(id)
    });
  } catch (e) {
    dispatch({ type: REMOVE_CREDIT_CARD_FAILURE });
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
    dispatch({ type: LIST_CREDIT_CARDS_FAILURE });
  }
};
