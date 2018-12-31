// @flow
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE,
  LIST_VENDORS_REQUEST,
  LIST_VENDORS_SUCCESS,
  LIST_VENDORS_FAILURE,
  UPDATE_DISTANCE_REQUEST,
  UPDATE_DISTANCE_SUCCESS,
  UPDATE_DISTANCE_FAILURE,
  UPDATE_PRICE_FILTER_REQUEST,
  UPDATE_PRICE_FILTER_SUCCESS,
  UPDATE_PRICE_FILTER_FAILURE,
  DISABLE_VENDOR_LIST_ITEM
} from './types';
import { get } from '../../utils/api';

export const toggleFilter = async (filterId: number) => async dispatch => {
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

export const listVendors = async (
  latitude: string,
  longitude: string,
  distance: string,
  activeFilters: string,
  pricing: number
) => async dispatch => {
  dispatch({ type: LIST_VENDORS_REQUEST });

  try {
    const vendors = await get(
      `/v1/vendors?latitude=${latitude}&longitude=${longitude}&distance=200000000&activeFilters=${activeFilters}&pricing=${pricing}`
    );

    dispatch({
      type: LIST_VENDORS_SUCCESS,
      payload: fromJS(vendors)
    });
  } catch (e) {
    dispatch({
      type: LIST_VENDORS_FAILURE,
      payload: e && e.message ? e.message : e
      });
    console.log("Errorrrrr ",e.message);
    throw e;
  }
};

// export const updateDistance = async (
//   latitude: string,
//   longitude: string,
//   distance: string
// ) => async dispatch => {
//   dispatch({ type: UPDATE_DISTANCE_REQUEST });
//
//   try {
//     const vendors = await get(
//       `/v1/vendors?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
//     );
//
//     const vendorsData = fromJS(vendors);
//     const updatedDistance = fromJS(distance);
//
//     dispatch({
//       type: UPDATE_DISTANCE_SUCCESS,
//       payload: { vendorsData, updatedDistance }
//     });
//   } catch (e) {
//     console.warn('e', e);
//     dispatch({ type: UPDATE_DISTANCE_FAILURE });
//   }
// };

export const updateDistance = async ( distance: string ) => async dispatch => {
  dispatch({ type: UPDATE_DISTANCE_REQUEST });

  try {
    dispatch({
      type: UPDATE_DISTANCE_SUCCESS,
      payload: fromJS(distance)
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: UPDATE_DISTANCE_FAILURE });
  }
};

export const updatePrice = async (pricing: number) => async dispatch => {
  dispatch({ type: UPDATE_PRICE_FILTER_REQUEST });

  try {
    // const vendors = await get(`/v1/vendors?pricing=${pricing + 1}`);
    //
    // const updatedVendors = fromJS(vendors);
    // const pricing = fromJS(pricing);

    dispatch({
      type: UPDATE_PRICE_FILTER_SUCCESS,
      payload: fromJS(pricing + 1)
    });
  } catch (e) {
    console.warn('e', e);
    dispatch({ type: UPDATE_PRICE_FILTER_FAILURE });
  }
}

export const disableVendorListItem = id => dispatch => {
  dispatch({
    type: DISABLE_VENDOR_LIST_ITEM,
    payload: id
  })
}
