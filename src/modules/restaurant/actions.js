import { fromJS } from 'immutable';

import {
  ADD_RESTAURANT_ITEM_REQUEST,
  ADD_RESTAURANT_ITEM_SUCCESS,
  ADD_RESTAURANT_ITEM_FAILURE
} from './types';

const addRestaurantItem = async (item: object) => async dispatch => {
  dispatch({ type: ADD_RESTAURANT_ITEM_REQUEST });

  try {
    return dispatch({
      type: ADD_RESTAURANT_ITEM_SUCCESS,
      payload: fromJS(item)
    });
  } catch (e) {
    dispatch({ type: ADD_RESTAURANT_ITEM_FAILURE });
  }
};

export default addRestaurantItem;
