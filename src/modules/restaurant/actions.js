import { fromJS } from 'immutable';

import {
  ADD_RESTAURANT_DETAIL_REQUEST,
  ADD_RESTAURANT_DETAIL_SUCCESS,
  ADD_RESTAURANT_DETAIL_FAILURE,
  ADD_SELECTED_ITEM_REQUEST,
  ADD_SELECTED_ITEM_SUCCESS,
  ADD_SELECTED_ITEM_FAILURE
} from './types';

export const addRestaurantDetail = async (restaurant: object) => async dispatch => {
  dispatch({ type: ADD_RESTAURANT_DETAIL_REQUEST });

  try {
    return dispatch({
      type: ADD_RESTAURANT_DETAIL_SUCCESS,
      payload: { restaurant }
    });
  } catch (e) {
    dispatch({ type: ADD_RESTAURANT_DETAIL_FAILURE });
  }
};

export const addSelectedItem = async (item: object) => async dispatch => {
  dispatch({ type: ADD_SELECTED_ITEM_REQUEST });

  try {
    return dispatch({
      type: ADD_SELECTED_ITEM_SUCCESS,
      payload: { item }
    });
  } catch (e) {
    dispatch({ type: ADD_SELECTED_ITEM_FAILURE });
  }
};
