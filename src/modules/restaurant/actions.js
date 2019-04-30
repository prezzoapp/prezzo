import { fromJS } from 'immutable';

import {
  ADD_RESTAURANT_DETAIL_REQUEST,
  ADD_RESTAURANT_DETAIL_SUCCESS,
  ADD_RESTAURANT_DETAIL_FAILURE,
  ADD_REMOVE_ITEM_QUANTITY_REQUEST,
  ADD_REMOVE_ITEM_QUANTITY_SUCCESS,
  ADD_REMOVE_ITEM_QUANTITY_FAILURE,
  // CHANGE_ITEM_RATING_REQUEST,
  // CHANGE_ITEM_RATING_SUCCESS,
  // CHANGE_ITEM_RATING_FAILURE,
  REMOVE_RESTAURANT_DETAIL_REQUEST,
  REMOVE_RESTAURANT_DETAIL_SUCCESS,
  REMOVE_RESTAURANT_DETAIL_FAILURE,
  CLEAR_CART_DATA_REQUEST,
  CLEAR_CART_DATA_SUCCESS,
  CLEAR_CART_DATA_FAILURE,

  // SET_TYPE_REQUEST,
  // SET_TYPE_SUCCESS,
  // SET_TYPE_FAILURE

  // SET_PAYMENT_TYPE_REQUEST,
  // SET_PAYMENT_TYPE_SUCCESS,
  // SET_PAYMENT_TYPE_FAILURE,
  //
  // CREATE_ORDER_REQUEST,
  // CREATE_ORDER_SUCCESS,
  // CREATE_ORDER_FAILURE
} from './types';

// import { post } from '../../utils/api';

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

export const addRemoveItemQuantity = async (
  sectionId: string,
  itemId: string,
  op: string
) => async dispatch => {
  dispatch({ type: ADD_REMOVE_ITEM_QUANTITY_REQUEST });

  try {
    return await dispatch({
      type: ADD_REMOVE_ITEM_QUANTITY_SUCCESS,
      payload: { sectionId, itemId, op }
    });
  } catch (e) {
    dispatch({ type: ADD_REMOVE_ITEM_QUANTITY_FAILURE });
  }
};

// export const changeItemRating = async (
//   sectionId: string,
//   itemId: string,
//   rating: number
// ) => async dispatch => {
//   dispatch({ type: CHANGE_ITEM_RATING_REQUEST });
//
//   try {
//     return dispatch({
//       type: CHANGE_ITEM_RATING_SUCCESS,
//       payload: { sectionId, itemId, rating }
//     });
//   } catch (e) {
//     dispatch({ type: CHANGE_ITEM_RATING_FAILURE });
//   }
// };

export const clearCartData = () => dispatch => {
  dispatch({ type: CLEAR_CART_DATA_REQUEST });

  try {
    return dispatch({
      type: CLEAR_CART_DATA_SUCCESS
    });
  } catch (e) {
    return dispatch({ type: CLEAR_CART_DATA_FAILURE });
  }
};

// export const setType = async (type: string) => async dispatch => {
//   dispatch({ type: SET_TYPE_REQUEST });
//
//   try {
//     return dispatch({
//       type: SET_TYPE_SUCCESS,
//       payload: { type }
//     });
//   } catch (e) {
//     return dispatch({ type: SET_TYPE_FAILURE });
//   }
// };

// export const createOrder = async (
//   items: array,
//   // status: string,
//   type: string,
//   paymentType: string,
//   vendor: string
// ) => async dispatch => {
//   dispatch({ type: CREATE_ORDER_REQUEST });
//
//   try {
//     const order = await post(`/v1/orders`, {
//       items,
//       // status,
//       type,
//       paymentType,
//       vendor
//     });
//
//     return dispatch({
//       type: CREATE_ORDER_SUCCESS,
//       payload: fromJS(order)
//     });
//   } catch (e) {
//     return dispatch({ type: CREATE_ORDER_FAILURE });
//   }
// };
