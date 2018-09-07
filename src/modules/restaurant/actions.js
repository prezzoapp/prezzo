import { fromJS } from 'immutable';

import {
  ADD_RESTAURANT_DETAIL_REQUEST,
  ADD_RESTAURANT_DETAIL_SUCCESS,
  ADD_RESTAURANT_DETAIL_FAILURE,
  ADD_REMOVE_ITEM_QUANTITY_REQUEST,
  ADD_REMOVE_ITEM_QUANTITY_SUCCESS,
  ADD_REMOVE_ITEM_QUANTITY_FAILURE,
  CHANGE_ITEM_RATING_REQUEST,
  CHANGE_ITEM_RATING_SUCCESS,
  CHANGE_ITEM_RATING_FAILURE,
  REMOVE_RESTAURANT_DETAIL_REQUEST,
  REMOVE_RESTAURANT_DETAIL_SUCCESS,
  REMOVE_RESTAURANT_DETAIL_FAILURE,
  CLEAR_CART_DATA_REQUEST,
  CLEAR_CART_DATA_SUCCESS,
  CLEAR_CART_DATA_FAILURE
} from './types';

export const addRestaurantDetail = (restaurant: object) => dispatch => {
  dispatch({ type: ADD_RESTAURANT_DETAIL_REQUEST });

  try {
    return dispatch({
      type: ADD_RESTAURANT_DETAIL_SUCCESS,
      payload: fromJS(restaurant)
    });
  } catch (e) {
    dispatch({ type: ADD_RESTAURANT_DETAIL_FAILURE });
  }
};

export const removeRestaurantDetail = () => dispatch => {
  dispatch({ type: REMOVE_RESTAURANT_DETAIL_REQUEST });

  try {
    return dispatch({
      type: REMOVE_RESTAURANT_DETAIL_SUCCESS
    });
  } catch (e) {
    dispatch({ type: REMOVE_RESTAURANT_DETAIL_FAILURE });
  }
};

export const addRemoveItemQuantity = (
  sectionId: string,
  itemId: string,
  op: string
) => dispatch => {
  dispatch({ type: ADD_REMOVE_ITEM_QUANTITY_REQUEST });

  try {
    return dispatch({
      type: ADD_REMOVE_ITEM_QUANTITY_SUCCESS,
      payload: { sectionId, itemId, op }
    });
  } catch (e) {
    dispatch({ type: ADD_REMOVE_ITEM_QUANTITY_FAILURE });
  }
};

export const changeItemRating = async (
  sectionId: string,
  itemId: string,
  rating: number
) => async dispatch => {
  dispatch({ type: CHANGE_ITEM_RATING_REQUEST });

  try {
    return dispatch({
      type: CHANGE_ITEM_RATING_SUCCESS,
      payload: { sectionId, itemId, rating }
    });
  } catch (e) {
    dispatch({ type: CHANGE_ITEM_RATING_FAILURE });
  }
};

export const clearCartData = () => dispatch => {
  dispatch({ type: CLEAR_CART_DATA_REQUEST });

  try {
    return dispatch({
      type: CLEAR_CART_DATA_SUCCESS
    })
  } catch (e) {
    return dispatch({ type: CLEAR_CART_DATA_FAILURE })
  }
};
