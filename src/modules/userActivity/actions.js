import { fromJS } from 'immutable';
import {
  GET_USER_OPEN_ORDER_REQUEST,
  GET_USER_OPEN_ORDER_SUCCESS,
  GET_USER_OPEN_ORDER_FAILURE
} from './types';
import { get } from '../../utils/api';

const listOpenOrders = async (userId: string) => async dispatch => {
  dispatch({ type: GET_USER_OPEN_ORDER_REQUEST });

  try {
    const data = await get(`/v1/users/${userId}/orders`);

    return dispatch({
      type: GET_USER_OPEN_ORDER_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: GET_USER_OPEN_ORDER_FAILURE });
  }
};

export default listOpenOrders;
