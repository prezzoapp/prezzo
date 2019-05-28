// @flow
import { fromJS } from 'immutable';
import { Location, Permissions } from 'expo';
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
  DISABLE_VENDOR_LIST_ITEM,
  GET_USER_CURRENT_LOCATION_REQUEST,
  GET_USER_CURRENT_LOCATION_SUCCESS,
  GET_USER_CURRENT_LOCATION_FAILURE,
  CALL_WAITER
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
    let priceParam = false;
    if(activeFilters !== '') {
      const filtersArray = activeFilters.split(',');
      for(const index in filtersArray) {
        if(filtersArray[index] === 'price') {
          priceParam = true;
          break;
        }
      }
    }

    const vendors = await get(
      priceParam
        ? `/v1/vendors?latitude=${latitude}&longitude=${longitude}&distance=200000000&activeFilters=${activeFilters}&pricing=${pricing}`
        : `/v1/vendors?latitude=${latitude}&longitude=${longitude}&distance=200000000&activeFilters=${activeFilters}`
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

export const getUserCurrentLocation = async () => async dispatch => {
  dispatch({ type: GET_USER_CURRENT_LOCATION_REQUEST });

  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { locationServicesEnabled } = await Location.getProviderStatusAsync();
      console.log(locationServicesEnabled);
      if(locationServicesEnabled) {
        const location = await Location.getCurrentPositionAsync({});
        if(location) {
          dispatch({
            type: GET_USER_CURRENT_LOCATION_SUCCESS,
            payload: fromJS(location.coords)
          });

          return location.coords;
        } else {
          throw new Error('Error while fetching location!');
        }
      } else {
        throw new Error('Location services unavailable!');
      }
    } else {
      throw new Error('Please on location services!');
    }
  } catch (err) {
    dispatch({
      type: GET_USER_CURRENT_LOCATION_FAILURE
    });

    throw err;
  }
}

export const callWaiterBtnFunc = param => dispatch => {
  dispatch({
    type: CALL_WAITER,
    payload: param
  })
};
