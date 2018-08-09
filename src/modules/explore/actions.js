// @flow
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE
} from './types';

const toggleFilter = async (filterId: number) => async dispatch => {
  dispatch({ type: TOGGLE_FILTER_REQUEST });

  try {
    dispatch({
      type: TOGGLE_FILTER_SUCCESS,
      payload: filterId
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: TOGGLE_FILTER_FAILURE });
  }
};

export default toggleFilter;
